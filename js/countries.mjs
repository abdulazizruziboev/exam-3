const baseURL = "https://countries-api-steel-theta.vercel.app"
export const getCountries = async () => {
  const response = await fetch(baseURL+"/api/countries");
  if(!response.ok) return [];
  const countries = await response.json();
  return countries?.data;
}

export const getFilteredCountries = async (text="",region = "all") => {
  let params = "";
  if(region === "all" && text === "") params = "";
  else if(region === "all" && text !== "") params = "?name="+text;
  else if(region !== "all" && text === "") params = "?region="+region;
  else if(region !== "all" && text !== "") params = "?name="+text+"&region="+region;
  const response = await fetch(baseURL+"/api/countries" + params);
  if(!response.ok) return [];
  const countries = await response.json();
  console.log(countries)
  return countries?.data;
}