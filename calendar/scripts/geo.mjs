// Normalises "City, State" strings from AICF/FIDE into { state, district }.
export const STATE_NAMES=["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"];
const ALIAS={ap:"Andhra Pradesh",mp:"Madhya Pradesh",up:"Uttar Pradesh",wb:"West Bengal",hp:"Himachal Pradesh",tn:"Tamil Nadu",jk:"Jammu and Kashmir","j&k":"Jammu and Kashmir",orissa:"Odisha",pondicherry:"Puducherry","new delhi":"Delhi","delhi ncr":"Delhi",uttaranchal:"Uttarakhand",andaman:"Andaman and Nicobar Islands"};
const CITY_GROUPS={
 "Maharashtra":"nashik,wardha,washim,pune,mumbai,navi mumbai,nagpur,thane,kolhapur,solapur,aurangabad,nanded,amravati",
 "Karnataka":"mysuru,mysore,bangalore,bengaluru,sandur,belagavi,belgaum,shivamogga,shimoga,haveri,hubli,dharwad,mangaluru,mangalore,ballari,davangere",
 "Tamil Nadu":"chennai,coimbatore,madurai,chengalpattu,pudukkottai,trichy,tiruchirappalli,salem,sivakasi,erode,tirunelveli,vellore,hosur",
 "Telangana":"hyderabad,warangal,secunderabad",
 "Andhra Pradesh":"visakhapatnam,vizag,vijayawada,guntur,tirupati",
 "Madhya Pradesh":"indore,bhopal,jabalpur,sagar,gwalior,ujjain",
 "Rajasthan":"kota,udaipur,bhilwara,jaipur,jodhpur,ajmer",
 "Gujarat":"vadodara,ahmedabad,surat,rajkot,gandhinagar",
 "Uttar Pradesh":"bareilly,varanasi,lucknow,kanpur,noida,agra,prayagraj,meerut",
 "Assam":"guwahati,dibrugarh,jorhat,silchar",
 "Chhattisgarh":"ambikapur,raipur,bilaspur,bhilai",
 "West Bengal":"jalpaiguri,kolkata,siliguri,durgapur",
 "Uttarakhand":"dehradun,haridwar,haldwani",
 "Jharkhand":"ranchi,jamshedpur,dhanbad,bokaro",
 "Odisha":"bhubaneswar,cuttack,rourkela,puri",
 "Kerala":"kochi,cochin,thiruvananthapuram,trivandrum,kottayam,kozhikode,thrissur",
 "Goa":"panaji,margao,madgaon,mapusa",
 "Bihar":"patna,kishanganj,gaya,muzaffarpur",
 "Haryana":"gurugram,gurgaon,faridabad,kurukshetra,panipat,rohtak",
 "Punjab":"ludhiana,amritsar,jalandhar,mohali,patiala",
 "Meghalaya":"shillong","Tripura":"agartala","Manipur":"imphal","Himachal Pradesh":"shimla","Chandigarh":"chandigarh",
};
const norm=s=>String(s||"").toLowerCase().replace(/[.\s]+/g," ").trim();
const STATE=Object.fromEntries([...STATE_NAMES.map(s=>[norm(s),s]),...Object.entries(ALIAS)]);
const CITY={};for(const [s,l] of Object.entries(CITY_GROUPS))l.split(",").forEach(c=>CITY[c]=s);

export function parsePlace(place){
  const parts=String(place||"").split(",").map(s=>s.trim()).filter(Boolean);
  let state="",district="";
  for(const x of [...parts].reverse()){if(STATE[norm(x)]){state=STATE[norm(x)];break}}
  for(const x of parts){if(!STATE[norm(x)]){district=x;break}}
  if(!state&&district)state=CITY[norm(district)]||"";
  if(district&&norm(district)===norm(state))district="";
  return {state,district};
}
