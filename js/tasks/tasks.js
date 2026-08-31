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

s={name: "John", age: 30, city: "New York"}
console.log(s.name)
for (let key in s){
    console.log(key,s[key])}
let n =Object.entries(s)

console.log(n)

//task5 empty cart array,qnd its functions
let cart=[];
cart.push("apple")
cart.push("milk")
cart.push("bread")
console.log(cart)
cart.pop()
console.log(cart)
for (let i of cart){
    console.log(i)
}
cart.forEach(c=>console.log(c))

//task6 library array of objects
let library = {
    name: "my book",
    books:[],
    available:true,
    addbook(title, author){
       const book = { title: title, author: author };
       this.books.push(book);
       return "added sucessfully"
    },
    borrowbook(title){
        const index = this.books.findIndex(book => book.title === title);
        if (index !== -1) {
            const borrowedBook = this.books.splice(index, 1)[0];
            return borrowedBook;
        }
        return null;
    },
    returnbook(title){
        const index = this.books.findIndex(book => book.title === title);
        if(!index) return "This book doesn't belong to us";
        if(index.available) return "This book was not borrowed";
        index.available=true;
        // console.log("Eere",index)
        this.addbook(title)
        return "Thanks"},
    showAvailableBooks(){
        return this.books
        .map(b=>`${b.title}`)
}};

console.log(library.addbook("book1","a1"));
console.log(library.addbook("book2","a2"));
console.log(library.addbook("book3","a3"));
console.log(library.addbook("book4","a4"));
console.log(library.borrowbook("book2"));
console.log(library.returnbook("book2"));
console.log(library.showAvailableBooks());

//class
class Calculator{
    add(a,b){return a+b;}
}

const  co=new Calculator()
const addres=co.add(5,3)
console.log(addres)

//dom
//document.getElementById("mainHeading").textContent="dee";

const firstP=document.querySelector(".para");
firstP.style.color="blue";
const P=document.querySelectorAll(".para");
P.forEach(i=>{i.style.background="yellow"});

const newpara=document.createElement('p');
newpara.textContent="new para";
document.body.appendChild(newpara)
