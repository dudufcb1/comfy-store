import axios from 'axios';

export const authFetch = axios.create({
  baseURL: 'https://strapi-store-server.onrender.com/api',
  headers: {
    Accept: 'application/json',
  },
});

export const formatPrice = (price) => {
  const dollarAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((price / 100).toFixed(2));
  return dollarAmount;
};

// export const generarOpciones = (howMany) => {
//   return [...Array(howMany).keys()].map((number) => (
//     <option key={number} value={number + 1}>
//       {number + 1}
//     </option>
//   ));
// };

// export const generarOpciones = (howMany) => {
//   const opciones = [];
//   for (let i = 1; i <= howMany; i++) {
//     opciones.push(
//       <option key={i} value={i}>
//         {i}
//       </option>
//     );
//   }
//   return opciones;
// };
export const generarOpciones = (howMany) => {
  return Array.from({ length: howMany }, (_, index) => (
    <option key={index + 1} value={index + 1}>
      {index + 1}
    </option>
  ));
};
