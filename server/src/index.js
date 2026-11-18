const path = require("path");
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

// El .env se ignora en git, así que si falta se usan los valores por defecto
try {
  process.loadEnvFile(path.join(__dirname, "..", ".env"));
} catch (e) {
  process.env.DATABASE_URL = process.env.DATABASE_URL || "file:./dev.db";
}

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3003;
const raiz = path.join(__dirname, "..", "..");

app.use(cors());
app.use(express.json());

// Tapa la carpeta server y los archivos ocultos para que no se vea el .env
app.use((req, res, next) => {
  const partes = req.path.split("/").filter(Boolean);
  const tapado = partes.some((p) => p === "server" || p.startsWith("."));
  if (tapado) {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  next();
});

app.use(express.static(raiz));

app.get("/api/frases", async (req, res) => {
  const frases = await prisma.frase.findMany({ orderBy: { id: "asc" } });
  res.json(frases);
});

app.get("/api/frases/:id", async (req, res) => {
  const id = Number(req.params.id);
  const frase = await prisma.frase.findUnique({ where: { id } });
  if (!frase) {
    return res.status(404).json({ error: "Frase no encontrada" });
  }
  res.json(frase);
});

app.post("/api/frases", async (req, res) => {
  const frase = await prisma.frase.create({
    data: {
      autor: req.body.autor,
      texto: req.body.texto,
    },
  });
  res.status(201).json(frase);
});

app.put("/api/frases/:id", async (req, res) => {
  const id = Number(req.params.id);
  const existe = await prisma.frase.findUnique({ where: { id } });
  if (!existe) {
    return res.status(404).json({ error: "Frase no encontrada" });
  }
  const frase = await prisma.frase.update({
    where: { id },
    data: {
      autor: req.body.autor,
      texto: req.body.texto,
    },
  });
  res.json(frase);
});

app.delete("/api/frases/:id", async (req, res) => {
  const id = Number(req.params.id);
  const existe = await prisma.frase.findUnique({ where: { id } });
  if (!existe) {
    return res.status(404).json({ error: "Frase no encontrada" });
  }
  await prisma.frase.delete({ where: { id } });
  res.json({ ok: true });
});

async function iniciar() {
  const total = await prisma.frase.count();
  if (total === 0) {
    await prisma.frase.createMany({
      data: [
        { autor: "Monkey D. Luffy", texto: "Yo voy a ser el rey de los piratas." },
        { autor: "Gabriel García Márquez", texto: "La vida no es la que uno vivió, sino la que uno recuerda." },
        { autor: "Anónimo", texto: "Un portafolio sin backend es solo una foto bonita." },
      ],
    });
  }
  app.listen(PORT, () => {
    console.log(`Servidor practica-css en http://localhost:${PORT}`);
    console.log("Base de datos lista (Prisma + SQLite)");
  });
}

iniciar();
