
import app from "./app";
const PORT=3000;
import { AppDataSource } from "./config/dataSource";

const startServer = async () => {
  try {
      console.log("⏳ Intentando conectar a la Base de Datos...");
      await AppDataSource.initialize();
      console.log("📦 Base de Datos conectada con éxito (MariaDB)");
    } catch (error) {
      console.log(`❌ Error conectando a la DB. Reintentando en 5s`);
    }

    if (!AppDataSource.isInitialized) {
      console.error("🔥 No se pudo conectar a la Base de Datos después de varios intentos. Cerrando aplicación.");
      process.exit(1);
   }
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();