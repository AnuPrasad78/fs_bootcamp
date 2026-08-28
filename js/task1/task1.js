console.log("Hello, World!");
let a="5";
let b="4";
console.log(typeof (a/b));

// Task1(ar of circle)
let r = 5;
let area = Math.PI * r * r;
console.log(area.toFixed(2));

//Task2 (fahrenheit to celsius)
let f = 98.6;
let c = (f - 32) * 5/9;
console.log(c.toFixed(2));

//Task3 (extract id value frm string)
let str="https://example.com/page?id=12345";
let idValue=str.split("id=")
console.log(idValue[1]);

//Task4 (password validation)
let password="Kopd_09"
function passwordVal(f){
    const len=f.length>6;
    const hasletter=/[a-z]/.test(f) && /[A-Z]/.test(f);
    const hasnum=/[0-9]/.test(f);
    return len && hasletter &&hasnum
    

}
let res=passwordVal("Pillo09")
console.log(res)

let fru=["apple","banana","mango","kiwi"]
fru.forEach(f=>{
    console.log(f)
})
for (let i of fru) {
    console.log(i)
}