const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.API_KEY;
const spreadsheetId = process.env.SPREADSHEET_ID;
const range = "A4:H27";

const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

async function getSheetData() {
  try {
    const response = await axios.get(url);
    const data = response.data;
    const value = data.values;
    if (value && value.length) {
      console.log("Dados da Planilha");
      value.forEach((element) => {
        if (element[2] > 60 * 0.25) {
          element[6] = "Reprovado por Falta";
        }
        console.log(element);
      });
    } else {
      console.log("Nenhum dado encontrado na planilaj");
    }
  } catch (error) {
    console.error("Ocorreu um erro", error);
  }
}

getSheetData();
