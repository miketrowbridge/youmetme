import {getDb} from "../../../db/index";
import {encounters} from "../../../db/schema";
export async function POST(request:Request){
const json=(body:object,status=200)=>Response.json(body,{status,headers:{"Cache-Control":"no-store"}});
if(request.headers.get("origin")!==new URL(request.url).origin)return json({error:"Please submit from this website."},403);
if(!request.headers.get("content-type")?.startsWith("application/json"))return json({error:"Invalid format."},415);
try{
const text=await request.text();if(text.length>6000)return json({error:"Please shorten your report."},413);
const p=JSON.parse(text);if(!p||typeof p!=="object")return json({error:"Invalid report."},400);
if(p.website)return json({error:"Please leave the hidden field blank."},400);
if(p.consent!==true)return json({error:"Please agree to send your report to Mike."},400);
for(const [k,max] of Object.entries({name:100,email:254,phone:40,when:10,where:200,notes:1000}))if(typeof p[k]!=="string"||p[k].length>max)return json({error:"Please check the form fields."},400);
if(p.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email))return json({error:"Please check your email address."},400);
if(p.when&&(!/^\d{4}-\d{2}-\d{2}$/.test(p.when)||Number.isNaN(Date.parse(p.when))))return json({error:"Please check the meeting date."},400);
const scores:Record<string,number|null>={};for(const key of ["professionalism","awkwardness","dadJokes","hangAgain"]){const v=p.scores?.[key];if(v!==null&&(!Number.isInteger(v)||v<0||v>10))return json({error:"Please check the ratings."},400);scores[key]=v;}
const payload={name:p.name.trim(),email:p.email.trim(),phone:p.phone.trim(),when:p.when,where:p.where.trim(),notes:p.notes.trim(),scores,consent:true};
const id=crypto.randomUUID();await getDb().insert(encounters).values({id,createdAt:new Date().toISOString(),payload:JSON.stringify(payload)});return json({id},201);
}catch(e){if(e instanceof SyntaxError)return json({error:"Invalid report."},400);return json({error:"Couldn’t save your report. Please try again shortly."},503);}
}
