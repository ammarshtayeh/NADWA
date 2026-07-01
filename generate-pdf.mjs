import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "دليل-المتحدث-الذكاء-الاصطناعي.html");
const pdfPath = path.join(__dirname, "دليل-المتحدث-الذكاء-الاصطناعي-للمعلمات.pdf");

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`, {
  waitUntil: "networkidle0",
});
await page.pdf({
  path: pdfPath,
  format: "A4",
  printBackground: true,
  margin: { top: "18mm", right: "15mm", bottom: "18mm", left: "15mm" },
});
await browser.close();
console.log("PDF created:", pdfPath);
