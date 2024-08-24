//TODO: TypeScript ----------------------------------------------------------------------------------------------


//! npm i -g typescript --> install typescript globally
//! tsc --version --> check the version of TypeScript
//! tsc first --> convert ts file into js file
//! tsc --init --> add tsconfig.json for customize settings
//! tsc -> compile all ts file on root directory
//! tsc --watch (realtime updating)


//* Basics ----------------------------------------------------------------

console.log("Hello world!");

// let age: number = 20;
// age = 'a'; // we can not assign a character into a number

let age: number = 20;
if(age < 50){
    age += 10;
}
console.log(age);



    //!      JavaScript          TypeScript
    //?       number              any
    //?       string              unknown
    //?       boolean             never
    //?       null                enum
    //?       undefined           tuple
    //?       object


//* permeative types in TypeScript-------------------------------------------


// let sales: number = 123_456_789;
// let course: string = 'TypeScript';
// let is_publish: boolean = true;
//! We also declare this type , cause typeScript automatically generates the type by seeing aligned values
let sales = 123_456_789;
let course= 'TypeScript';
let is_publish = true;

let level; //! if we don't initialized it then default type is ( any ). any --- any type of values
level = 1;
level = 'a';
//! try to avoid use of any , cause we can put any types of values in a variable


function render(document){  //! parameter document implicitly type of any (compiler did not guess the type so give error)
    console.log(document);
}

function render1(document :any){ //! we can use this way to avoid error
    console.log(document);
}

function render2(document ){   //! "noImplicitAny": false, make for run this code
    console.log(document);
}


//* Arrays ----------------------------------------------------------------

// let arr = [1,2,'3']; // JavaScript arrays
let arr1 : number[] = [1,2,3]; // TypeScript arrays

// let nums = []; //! if we implement an empty array we can put any type of data
// nums[0] = 1;
// nums[1] = '2';
//! so we need to define the type
let num : number[]= [];
num[0] = 1;
num[1] = 2;

num.forEach(n=>n.toString()); //! we get all methods here


//* Tuples ----------------------------------------------------------------
// 1 , Ankan
let user: [number , string] = [1,'Ankan'];
console.log(user);
user[0].toString(); //! we get all methods of number here
user[1].toLowerCase(); //! we get all methods of string here
user.push(2); // it is incorrect but it don't give any error
let user1: [number , string , boolean , number] = [1,'Ankan',true , 24];


//* Enums----------------------------------------------------------------
// a list of related content
const small = 1;
const medium = 2;
const large = 3;

const enum Size { Small = 1 , Medium , Large };  // others members value like 2 , 3
// // enum Size1 { Small = 's' , Medium='m' , Large='l'};
let mySize: Size = Size.Medium;
console.log(mySize);


//* Functions----------------------------------------------------------------
function calculateTax(income : number){   //! it depends upon return type 
   return 0;  
}
//! we can use like that way
function calculateTax1(income : number , taxYear:number): number {    
    if(taxYear < 2022){
        return income * 1.2;
    }// by default javascript return undefined
    return income*1.3;
 }
 calculateTax1(10_000,2022);
// //  calculateTax(10_000,2022,10); //! we can't add more parameter than function accepts


function calculateTax2(income : number , taxYear?:number): number {   //! we can use ? symbol if use don't send parameter
    if((taxYear ||2022) < 2022){ //! add 2022 as default value if it not pass on parameter
        return income * 1.2;
    }// by default javascript return undefined
    return income*1.3;
 }
 calculateTax2(10_000);   //! send only one parameter
// ! we also do this like
function calculateTax3(income : number , taxYear = 2022): number {   //! direct assignment value
    if(taxYear< 2022){ 
        return income * 1.2;
    }// by default javascript return undefined
    return income*1.3;
 }
 calculateTax3(10_000); // if we pass 2nd argument then it overrides 


//* object----------------------------------------------------------------
// JavaScript object 
// let employee = {id:1};
// employee.name = "Ankan"; //! this is valid on JavaScript but not on TypeScript

let employee :{
    id: number,
    name: string
  } = {id:1, name:'Ankan'};

  let employee1 :{
   readonly id: number, //! we can read only this value ,  don't change it
    name?: string   //! by using ? we make name as optional parameter
  } = {id:1};
  employee1.name = "Ankan"; 
  // employee1.id = 2; //! it gives error because id is readonly


  let employee2 :{
        id: number,
        name: string
        retire: (date: Date)=> void  //! we can add methods , and add return value in arrow function
      } = {
        id:1,
        name:'Ankan',
        retire: (date: Date)=> {
            console.log(`Employee is retiring on ${date.toDateString()}`);
        }
    };


//* Type Aliases--------------------------------------------
// we can define a custom type
type Employee = {
 readonly id: number,
  name: string,
  retire: (date: Date)=> void
}
// //! we define the shape of the object by using Type Aliases , and we can use it multiple times
let employee3: Employee = {
  id:1,
  name:'Ankan',
  retire: (date: Date)=> {
      console.log(`Employee is retiring on ${date.toDateString()}`);
  }
}


//* Union Types--------------------------------
// we can use variable , functions parameter more than one type
function kgToLbs(weight: number | string) : number{
//   // weight.toString();  //! we only found only common methods between number and string here
  //// Narrowing
  if(typeof weight === 'number'){
    return weight * 2.2;   //! we can found all methods of number here
   }else{
     return parseInt(weight)*2.2;  //! we can found all methods of string here
    }
}

kgToLbs(10);
kgToLbs('10kg');


//* Intersection Types--------------------------------
// it is also use for combine types
// let weight = number & string;

type Draggable = {
  drag: ()=> void; 
};
type Resizable = {
  resize: ()=> void;
};
//! we can combine them into a new type
type UIWidget = Draggable & Resizable;

let textBox : UIWidget = {   //! we can use all methods of UIWidget
  drag: ()=> console.log('dragging'),  
  resize: ()=> console.log('resizing')
}


//* Literal Types--------------------------------
// we can limits some values of a variable
// Litera (exact,specific)
let quantity: 50=50; //! we set it 50 , so we can only assign it on 50
let quantity1: 50 | 100 = 100;
type Quantity = 50|100; //! this is literal type
let quantity2 : Quantity = 100; //! we can use like this way
type Metric = 'cm' | 'inch';


//* Nullable Types--------------------------------
function greet(name: string | null | undefined){ //! we can handle null and undefined by using union operator
  if(name)
   console.log(name.toUpperCase());
  else
   console.log('Name is not string');
}
greet(null); //! in JavaScript WE can use null or undefined here without giving an error
greet(undefined);



type Customer = {
  birthday? :Date  //! by using ? operator now birthday property is optional
};

function getCustomer(id: number): Customer | null | undefined {
  return id === 0 ? null : {birthday: new Date() };
};

let customer = getCustomer(1);
// // if(customer !== null && customer !== undefined)  
// //! we can use Optional property access operator and don't use if()
console.log(customer?.birthday?.getFullYear); //! by using ? operator // it will only execute when customer is not null or undefined

//! Optional element access operator
// it is use full for dealing with arrays and
if(customer !== null && customer!== undefined)
console.log(customer?.birthday);  //! by using ? and . operator we handel null  or undefined 

//!Optional call
let log : any = null;
log?.('a'); //! this pice of code will executed when Log is refreshing an actual function , otherwise it will gave undefined

