const BASE_URL = "https://overpass-api.de/api/interpreter";

export const OverpassController = async (layerQuery, box) => {
  try {
    const query = `
      [out:json][timeout:25];
      (${layerQuery.replace(/$begin:math:display$BOX$end:math:display$/gi, box)});
      out;
      >;
      out skel qt;
    `;
    const formBody = "data=" + encodeURIComponent(query);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: formBody
    };
    const response = await fetch(`${BASE_URL}`, requestOptions);
    const data = await response.json();
    console.log("Overpass Controller Response:", data);
    return data.elements;
  } catch (err) {
    console.error(err);
    return false;
  }
};