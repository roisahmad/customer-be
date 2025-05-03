const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
require('dotenv').config();
const connectDB = require('../config/db');
const Customer = require('../models/customer');

const parseDate = (dateString) => {
  if (!dateString) return null;
  
  const parts = dateString.split('/');
  if (parts.length === 3) {
    return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`);
  }
  
  return new Date(dateString);
};

async function importCsvToMongo(csvFilePath) {
  try {
    if (!fs.existsSync(csvFilePath)) {
      console.error(`File tidak ditemukan: ${csvFilePath}`);
      console.log('Coba cari file CSV...');
      
      const possibleLocations = [
        path.join(__dirname, 'data', 'Dataset.csv'),
        path.join(__dirname, '../data', 'Dataset.csv'),
        path.join(__dirname, 'Dataset.csv'),
        path.join(__dirname, '../Dataset.csv'),
        path.join(process.cwd(), 'data', 'Dataset.csv'),
        path.join(process.cwd(), 'Dataset.csv')
      ];
      
      for (const location of possibleLocations) {
        console.log(`Memeriksa: ${location}`);
        if (fs.existsSync(location)) {
          console.log(`File ditemukan di: ${location}`);
          csvFilePath = location;
          break;
        }
      }
      
      if (!fs.existsSync(csvFilePath)) {
        console.error('File CSV tidak ditemukan di lokasi manapun. Proses dihentikan.');
        return;
      }
    }

    await connectDB();
    console.log('Berhasil terhubung ke MongoDB');

    const results = [];
    
    console.log(`Membaca file CSV: ${csvFilePath}`);
    
    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .on('error', (error) => {
          console.error(`Error saat membaca file: ${error.message}`);
          reject(error);
        })
        .pipe(csv())
        .on('data', (data) => {
          if (results.length === 0) {
            console.log('Contoh data dari CSV:', data);
          }
          const customer = {
            number: data.Number ? parseInt(data.Number) : null,
            nameOfLocation: data['Name of Location'],
            date: parseDate(data.Date),
            loginHour: data['Login Hour'],
            name: data.Name,
            age: data.Age ? parseInt(data.Age) : null,
            gender: data.gender,
            email: data.Email,
            noTelp: data['No Telp'],
            brandDevice: data['Brand Device'],
            digitalInterest: data['Digital Interest'],
            locationType: data['Location Type']
          };
          
          results.push(customer);
        })
        .on('end', () => {
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    console.log(`Menyimpan ${results.length} data ke MongoDB...`);
    
    if (results.length > 0) {
      await Customer.insertMany(results);
      console.log(`Berhasil mengimpor ${results.length} data ke MongoDB`);
    } else {
      console.log('Tidak ada data untuk diimpor');
    }

  } catch (error) {
    console.error('Terjadi kesalahan saat mengimpor data:', error);
  } finally {
    console.log('Import selesai');
  }
}
console.log('Working directory:', process.cwd());

const csvFilePath = path.join(process.cwd(), 'data', 'Dataset.csv');

console.log(`Mencoba membaca file: ${csvFilePath}`);
importCsvToMongo(csvFilePath);