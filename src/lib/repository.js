import axios from "axios";
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Ags",
  "Sep",
  "Oct",
  "Nov",
  "Des",
];

const sanitizeData = (value) => {
  if (value === null || value === undefined || value === "" || value === "0") {
    return null;
  }
  return value;
};

const immunizationList = [
  "HBO",
  "BCG",
  "Polio 1",
  "DPT 1",
  "Polio 2",
  "PCV 1",
  "RV 1",
  "DPT 2",
  "Polio 3",
  "PCV 2",
  "RV 2",
  "DPT 3",
  "Polio 4",
  "IPV 1",
  "RV 3",
  "Rotarix 1",
  "Rotarix 2",
  "MR 1",
  "IPV 2",
  "PCV 3",
  "DPT 4",
  "MR 2",
];

export const getData = async () => {
  const spreadsheetId = "17InVcAlj57yt5GrF5OjRVVly0jfVOxxw3LEUsh-IOsI";

  const apiKey = "AIzaSyD0NeHlzhFKjS33SKtw13rlaW1YxwZdlm0";
  const jan = "sheet1!a3:bs565";

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${jan}?key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const rows = response.data.values;
    if (!rows || rows.length === 0) return [];

    const cleanData = rows.map((item) => {
      // Profil Balita
      const profile = {
        pos: item[1], // Pos
        nik: item[2], // NIK
        name: item[3], // Nama
        jk: item[4], // Jenis Kelamin
        birth_date: item[5], // Tgl Lahir
        birth_month: item[6], // Bln Lahir
        birth_year: item[7], // Thn Lahir
        address: item[8], //
        child_no: item[9], //
        parent_nik: item[10], //
        parent_name: item[11], //
        phone: item[12], //
      };

      // Imunisasi
      const imunisasi = immunizationList.map((name, i) => {
        return {
          name: name,
          value: sanitizeData(item[13 + i]),
        };
      });

      // Bobot
      const monthlyRecord = monthNames.map((month, i) => {
        const baseIdx = 35 + i * 3;

        return {
          month: month,
          bb: sanitizeData(item[baseIdx]),
          tb: sanitizeData(item[baseIdx + 1]),
          status: sanitizeData(item[baseIdx + 2]),
        };
      });

      return {
        ...profile,
        imunisasi: imunisasi,
        timbang: monthlyRecord,
      };
    });

    return cleanData;
  } catch (error) {
    console.error("Error fetchin data", error);
  }
};
