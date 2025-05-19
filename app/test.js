// // const axios = require("axios");
// import axios from "axios";

// const names = ["pippsza", "nameless tee"];

// const fetchOnline = async () => {
//   const MASTER_URL = "https://master1.ddnet.org/ddnet/15/servers.json";
//   const response = await axios.get(MASTER_URL);
//   const data = response.data.servers;
//   return data;
//   //   console.log(data[0].addresses);
// };

// const onlineChecker = async () => {
//   const servers = await fetchOnline();

//   const result = names.map((name) => ({
//     name,
//     data: {
//       status: "Offline",
//       game: null,
//       server: null,
//       mapName: null,
//     },
//   }));

//   const lookup = result.reduce((accumulator, entry) => {
//     // В accumulator по ключу entry.name сохраняем ссылку на entry.data
//     accumulator[entry.name] = entry.data;
//     return accumulator;
//   }, {});
//   for (const server of servers) {
//     if (!server.info || !server.info.clients) {
//       continue;
//     }
//     const serverName = server.info.name;
//     const gameType = server.info.game_type;
//     const mapName = server.info.map?.name || null;
//     const playersArr = server.info.clients;

//     for (const playerObj of playersArr) {
//       const playerName = playerObj.name;
//       if (!lookup[playerName]) {
//         continue;
//       }
//       const dataEntry = lookup[playerName];
//       dataEntry.status = playerObj.afk ? "AFK" : "Online";
//       dataEntry.game = gameType;
//       dataEntry.server = serverName;
//       dataEntry.mapName = mapName;
//     }
//     // console.log(result);
//   }
//   return result;
// };

// const data = await onlineChecker();
// console.log(data);

// // console.log(result);
