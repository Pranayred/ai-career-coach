require("dotenv").config({ path: ".env" });

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const url = new URL("https://generativelanguage.googleapis.com/v1beta/models");
  url.searchParams.set("key", apiKey);

  const response = await fetch(url);
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Request failed: ${response.status} ${response.statusText} - ${body}`);
  }

  const data = await response.json();
  const simple = data.models?.map((model) => ({
    name: model.name,
    methods: model.supportedGenerationMethods,
  }));

  console.log(JSON.stringify(simple, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
