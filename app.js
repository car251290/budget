
// this is one module budgetcontroller
var budgetController = (function(){
// the expenses of the function
var Expense = function(id,value,description){
    this.id = id;
    this.value = value;
    this.description = description;
    this.percentage = -1;
};
//the expenses
Expense.prototype.calculatePercentages = function(totalIncome) {
    if(totalIncome > 0){
        this.percentage = Math.round ((this.value / totalIncome * 100))
    }else{
        this.percentage = -1;
    }

};
Expense.prototype = function(){
    return this.percentage;
}
var Income = function(id,value,description){
    this.id = id;
    this.value = value;
    this.description = description;
};
var calculateTotal = function(type){
var sum = 0;

data.allItem[type].forEach(function(curr){
    sum +=curr.value;
});
data.total[type]=sum;
};
var data = {
    allExpenses:{
        inc :[],
        exp: []
    },
    total : {
        exp:0,
        init:0
    },
    budget:0,
    percentage: -1

};
return {
    addItem : function(type,des,val){
        var newItem,ID;
        //create new ID
        if(data.allItems[type].lenght > 0){
            ID = data.allItems[item][data.allItem[type].lenght -1].id +1;
        } else {
            ID = 0
        }
        
        //Create new item 
        if(type === "exp"){
            newItem = new Expense(ID,des,val)
        } else if (type === 'inc'){
             
            newItem = new Income(ID,des,val)
        }
        //add the the items of the item
        data.allItem[type].push(newItem);
        //return the the item with the id
        return newItem;
    },
    //for delate the Item
    delateItem : function(type,id){
        var ids, index;
          ids = data.allItem[type].map(function(current){
            return current.id;
        });
        index = ids.indexof(id);
        if(index !== -1) {
            data.allItem[type].slice(index,1);

        }
    },
    calculatetheBudget:function(){
        // calculate total income and expenses
        calculateTotal('exp');
        calculateTotal('inc');
        // calculate the budget income- expeses
        data.budget = data.total.inc - data.total.exp;
        // calculate the percentege of the income that we sport
        if(data.total.inc > 0){
            data.percentage = Math.round (data.total.exp/data.total.inc * 100)

        } else {
            data.percentage = -1;
        }
        //exprese the 100 and the icon of 100
    },
    //calculate the percentage
    calculatePercentages : function(){
        data.allItems.exp.foreach(function(curr){
            curr.calculatePercentages(data.totalInc);
        });
    },
    // to get the percentages
    getPercentages : function(){
        var allpercenteges = data.allItem.exp.map(function(curr){
            return curr.getPercentages();
        });
        return allpercenteges;
    },
    //get the data of the function and store it
    getBudget : function () {
        return {
            budget : data.budget,
            totalInc: data.total.inc,
            totalExp : data.total.exp,
            percente : data.total.percentage
        }
    },
    testing : function(){
        console.log(data)
    }
};
   
})();
//second module uicontroller
var UIController = (function(){
    //score code this is the DOM of the string.
    var Domstring = {
        inputType:'add__type',
        inputDescription:'add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer : 'income__list',
        expensesContainer : 'expeses__list',
        budgetLabol: "budget__value",
        incomeLabel:".budget__income--value",
        expensesLabel: ".budget--expenses--value",
        percemtageLabel:".budget__expenses--percentage",
        container : ".container",
        expensesPercLabel:".item__percentage",
        dateLabol : '.budget__title--month'
    };
    var formatNumber
    formatNumber = function(num,type){
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int = numSplit[0];
        if(int.lenght > 3){
           int = int.substr(0, int.lenght -3) + ','+ int.substr(int.lenght-3 ,3);
        }
        dec= numSplit[1];
        return  (type == 'exp '? sign ='-': sing = "+") + '.'+ int + dec;
    };
    //nodelidt for each element in the list exp or inc
    var nodelistForEach = function(list,callback){
        for(var i =0; i<list.lenght; i++){
            callback(list[i],i)
        }
    };
    return {
        getInput: function(){
            return {
                type: document.querySelector(Domstring.inputType).value,
                description: document.querySelector(Domstring.inputDescription).value,
                value : parseFloat(document.querySelector(Domstring.inputValue).value)
            };
        },
        addListItem: function (obj,type){
            var html,newHtml,element;
            // create a html string with placeholder text
            if(type === 'inc') {
            element = DOMstring.incomeContainer;

               html = ' <div class="item clearfix" id="inc-%id">'
                '<div class="item__description">%description</div>'
                '<div class="right clearfix">'
                   '<div class="item__value">%value+ 2,100.00</div>'
                    '<div class="item__delete">' 
                    ' <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'
                    '</div>'
                    '</div>'
                    '</div>'
            } else if (type === 'exp') {
                element = DOMstring.expensesContainer;
               html = ' <div class="item clearfix" id="exp-%id">'
                '<div class="item__description">%description</div>'
                '<div class="right clearfix">'
                   '<div class="item__value">%value</div>'
                    '<div class="item__delete">' 
                    ' <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'
                    '</div>'
                    '</div>'
                    '</div>'
            }
            // replace the placeholder text
            newHtml = htm.replace('%id',obj.id);
            newHtml = newhtm.replace('%description',obj.description);
            newHtml = newhtm.replace('%value', formatNumber(obj.value,type));
            //insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

        },   
        delateListItem : function(selectorID){
            var elementisthis =  document.getElementById(selectorID);
            elementisthis.removeChild(elementisthis);

        },
        clearFiles = function(){
            var fields
            var fieldsArray
            //make an array of description in the input 
           fields = document.querySelectorAll(DOMstring.inputDescription + ','+ 
           DOMstring.inputValue);
           var fieldsArray = Array.prototype.slice.call(fields);
           //new way to forloop the elemnts and array.

           fieldsArray.forEach(function(current,index,array){
               current.value ='';
           });
           //for input the budget
           fieldsArray[0].focus();
        },  
        //displayBudget of the function
        displayBudget: function(obj){
            if(obj.percentage > 0){
                document.querySelector(DOMstring.percemtageLabel).textContent = obj.percentage + "%";

            } else {
                document.querySelector(DOMstring.percemtageLabel).textContent = obj.percentage +'--';
            }
            obj.budget>0?type ='inc' : type ='exp';
            document.querySelector(DOMstring.budgetLabel).textContent = formatNumber(obj.budget);
            document.querySelector(DOMstring.incomeLabel).textContent = formatNumber (obj.totalInc);
            document.querySelector(DOMstring.expensesLabel).textContent = formatNumber (obj.totalExp);
            document.querySelector(DOMstring.percemtageLabel).textContent = formatNumber (obj.percentage);
        },
        //display thepercentate of the fields 
        displayPercentage:function(percentages){
            var fields = document.querySelectorAll(DOMstring.expensesPercLabel);
            nodelistForEach(fields,function(current,index){
                if(percentages[index]>0){
                    //do stuff
                current.textContent= percentages[index]+ '%';

                } else{
                    current.textContent = '---';
                }
            });
        },
        //display the month with the function
        displayMonth : function() {
            var now,months,month,year;
            now = new Date();
            months =["january","february",'March','April','May','June','July','September','Octuber','November','December'];
            //var chritmas day of the budget
            month = now.getMonth();

            year = now.getFullYear();

            document.querySelector(DOMstring.dateLabol).textContent = month[months] +'.' +  year;  
        },
        //change the type of the negative with the colors
        changetype: function(){
            var fields = document.querySelectorAll(
                DOMstring.inputType, + '' +
                DOMstring.inputDescription, + '' +
                DOMstring.inputValue, + '' + "" 
            );
            nodelistForEach(fields,function(cur) {
                cur.classList.toggle('.red-focus');
            });
            document.querySelector(DOMstring.inputBtn).classList.toggle('.red');
        },
         getDomstring : function (){
            return Domstring;
        }
    }

})();
//third Module controller
//global module app controller
var controller = (function(budgetctrl,UICTRL){
var setUpEeventLisenrs = function (){
    var DOM = UICTRL.getDomstring();
    document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
    //Evenlisener
    document.addEventListener('keypress',function(event){
      if(event.keyCode === 13 ){
          
          ctrlAddItem();
      }
      document.querySelector(DOM.container).addEventListener(click,ctrlDelateItem)
    });
    document.querySelector(DOM.inputType).addEventListener('change',UICTRL(changetype));
    
}
//THIS THE function for the update the budget to calculate the budget with the controller
var updatebudget = function () {
// 1 calculate the budget
budgetctrl.calculatetheBudget();
//2 return the budget
var budget = budgetctrl.getBudget();
// 3 displat the budget on the UI
UICTRL.displayBudget(budget);

}
var updatePercentages = function(){
    //1 calculate percentages
    budgetctrl.calculatetheBudget();
    // update the usar interface
    var percentages = budgetctrl.getPercentages();
    //update the UI with the new percentajes
    UICTRL.displayPercentage(percentage);
};

var ctrlAddItem = function() {
    var input , newItem;
//1. get the filed input data
input = UICTRL.getInput();
if (input.description !== '' && !isNaN (input.value) && input.value > 0){
    //2. add the icon to the budget controller
newItem = budgetctrl.addItem(input.type,input.description,input.value);
//3.Add the the item to UI
UICTRL.addListItem(newItem,input.type);
//4. clear the fields
UICTRL.clearFiles();
// 5 calculate and update and call them
updatebudget();
//5.display the budget on the UI
}

};
var ctrlDelateItem = function (event){
    var itemID,type,ID;
   itemID = console.log(event.target.parseNote.parseNote.parseNote.parseNote.id);

   if(itemID) {
       //inc-1
       slitID =itemID.split('-');
       type = split[0];
       ID = parseInt(slitID[1]);

       // delate the item from the data
       budgetctrl.delateIte(type,ID);


       // delaye yje item from UI
       UICTRL.delateListItem(itemID);


       // UPDATE and shoe the new budget
       updatebudget();

       // updateporcentajes
       updatePercentages();

   }
};
//init return as an object
return {
    init: function(){
        UICTRL.displayMonth();
        UICTRL.displayBudget({
            budget : 0,
            totalInc: 0,
            totalExp : 0,
            percente : -1
        });
        setUpEeventLisenrs();
        console.log('Application has started')
    }
}

}) (budgetController,UIController);
//this is to call the init();
controller.init();
