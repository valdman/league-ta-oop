import { renderToReadableStream } from "react-dom/server";
import { Html } from "./app";

// Это пример запуска приложения и отправки компонентов в браузер. См. консоль запуска.
// Работает только через Bun, не через ts-node
if (globalThis.Bun) {
  const { Bun } = globalThis;

  console.log("Building client bundle...");

  const { success, outputs, logs } = await Bun.build({
    entrypoints: ["src/boris/006/index.tsx"],
    target: "browser",
    sourcemap: "inline",
  });
  
  console.log(`Client bundle built. Hash "${outputs[0].hash}"`);

  const { port } = Bun.serve({
    fetch(req: Request) {
      const url = new URL(req.url);
      if (!success) return new Response(logs.join("\n"), { status: 500 });
      if (url.pathname === "/index.js") return getClientBundle();
      if (url.pathname === "/") return getHtml();
      return new Response("Not found", { status: 404 });
    },
  });

  console.log(`Server started on http://localhost:${port}`);

  const clientScript = await outputs[0].text();

  function getClientBundle() {
    return new Response(clientScript, {
      headers: { "content-type": "text/javascript" },
    });
  }

  async function getHtml() {
    const reactElement = <Html scriptHash={outputs[0].hash!} />;
    const htmlStream = await renderToReadableStream(reactElement);

    return new Response(htmlStream, {
      headers: {
        "content-type": "text/html",
      },
    });
  }
}
