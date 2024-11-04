const ENG = "#783F04";
const REKH = "#20124D";
const KHAR = "#4C1130";
const ANCIENT = "#274E13";
const CLASS = "#7F6000";

window.onload = () => {
    let req = new XMLHttpRequest();
    req.open("GET","./dict.tsv");
    req.onreadystatechange = function(){
        if(req.readyState === req.DONE && req.status === 200){
            main(req);
        }
    }
    req.send();
}

function main(req) {
    let table = document.getElementById("dictionary");

    const dictionary = getSortedDictionary(req.responseText);
    fillTable(table, dictionary);

    // ================================================================
    // SEARCH FUNCTIONALITY

    let iText = document.getElementById("se");  // gets the text box
    let iButton = document.getElementById("sb");  // gets the button
    let searchEnglish = document.getElementById("s-eng");  
    let searchEastern = document.getElementById("s-east");  
    let searchWestern = document.getElementById("s-west");  
    let searchAncient = document.getElementById("s-anc");  
    let searchType = document.getElementById("s-typ");  
    let searchNotes = document.getElementById("s-note");  

    iButton.addEventListener("click", () => {
        searchTable(table, dictionary, iText.value.toLowerCase(), SearchParams.all());
    });
    searchEnglish.addEventListener("click", () => {
        searchTable(table, dictionary, iText.value.toLowerCase(), SearchParams.english());
    });
    searchEastern.addEventListener("click", () => {
        searchTable(table, dictionary, iText.value.toLowerCase(), SearchParams.eastern());
    });
    searchWestern.addEventListener("click", () => {
        searchTable(table, dictionary, iText.value.toLowerCase(), SearchParams.western());
    });
    searchAncient.addEventListener("click", () => {
        searchTable(table, dictionary, iText.value.toLowerCase(), SearchParams.ancient());
    });
    searchType.addEventListener("click", () => {
        searchTable(table, dictionary, iText.value.toLowerCase(), SearchParams.category());
    });
    searchNotes.addEventListener("click", () => {
        searchTable(table, dictionary, iText.value.toLowerCase(), SearchParams.note());
    });
    
    iText.addEventListener("keyup", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            iButton.click();
        }
    })

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            searchTable(table, dictionary, "", SearchParams.all());
            return;
        }

        if (!((event.ctrlKey || event.metaKey) && event.altKey)) {
            return;
        }

        if (event.key === "1") {
            searchEnglish.click();
        }
        if (event.key === "2") {
            searchEastern.click();
        }
        if (event.key === "3") {
            searchWestern.click();
        }
        if (event.key === "4") {
            searchAncient.click();
        }
        if (event.key === "5") {
            searchType.click();
        }
        if (event.key === "6") {
            searchNotes.click();
        }
    })

}

function getSortedDictionary(dict) {
    dict = dict.split("\n");
    dict = dict.map(ln => ln.split("\t"));
    let titles = dict.slice(0, 1);
    let everythingelse = dict.slice(1);
    everythingelse.sort((a,b) => a[0].localeCompare(b[0]));
    return titles.concat(everythingelse);
}

function fillTable(table, dict) {
    /**@type {String[]} */
    let titles = dict.slice(0, 1)[0];
    /**@type {String[][]} */
    let data = dict.slice(1);  

    addTitleRow(table, titles)

    console.log(data)

    data.forEach(row => {
        if (row.length < 5) return;
        if (row.length == 5) {
            row.push("")
        }
        // console.log(row)
        addRow(table, row, "td")
    })

}

function addTitleRow(table, titles) {
    let row = document.createElement("tr");
    titles.forEach(t => {
        let th = document.createElement("th");
        let h4 = document.createElement("h3");
        h4.innerText = t;
        h4.style.paddingBottom = "0.6em";
        h4.style.paddingTop = "0em";
        th.appendChild(h4);
        row.appendChild(th);
    })
    // colouring

    row.children.item(0).style.color = ENG;
    row.children.item(1).style.color = REKH;
    row.children.item(2).style.color = KHAR;
    row.children.item(3).style.color = ANCIENT;
    row.children.item(4).style.color = CLASS;

    table.appendChild(row)
}

function addRow(table, array, rowType) {
    // filling data
    let row = document.createElement("tr");
    array.forEach(e => {
        let th = document.createElement(rowType);
        th.innerText = e;
        row.appendChild(th);
    });

    // colouring
    row.children.item(0).style.color = ENG;
    row.children.item(1).style.color = REKH;
    row.children.item(1).style.fontStyle = "italic";
    row.children.item(2).style.color = KHAR;
    row.children.item(2).style.fontStyle = "italic";
    row.children.item(3).style.color = ANCIENT;
    row.children.item(3).style.fontStyle = "italic";
    row.children.item(4).style.color = CLASS;
    table.appendChild(row)
}

/**
 *  
 * @param {*} htmlTable 
 * @param {Array} dictArray 
 * @param {string} keyword 
 * @param {SearchParams} searchParams 
 */
function searchTable(htmlTable, dictArray, keyword, searchParams) {
    keyword = keyword.trim();

    let newArray;
    if (keyword !== "") {
        let keywords = keyword.split(" ")

        let title = dictArray.slice(0,1);
        let result = dictArray.slice(1).filter(row => {
            // console.log(row);
            return keywords.every(kw => matchesParams(kw, row, searchParams));
        });
        newArray = title.concat(result);
    } else {
        newArray = dictArray;
    }
    
    resetTable(htmlTable);
    fillTable(htmlTable, newArray);
}

/**
 * 
 * @param {string} searchTerm 
 * @param {Array[string]} row 
 * @param {SearchParams} searchParams 
 * @returns bool
 */
function matchesParams(searchTerm, row, searchParams) {
    function entryHas(index, has) {
        return row[index].toLowerCase().includes(has);
    }

    if (row.length != 6) {
        console.log("Row length is not correct:");
        console.log(row);
        return false;
    }

    let cleanTerm = searchTerm.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
    
    let a = searchParams.english && entryHas(0, cleanTerm);
    let b = searchParams.eastern && entryHas(1, cleanTerm);
    let c = searchParams.western && entryHas(2, cleanTerm);
    let d = searchParams.ancient && entryHas(3, cleanTerm);
    let e = searchParams.category && entryHas(4, cleanTerm);
    let f = searchParams.note && entryHas(5, cleanTerm);

    console.log(a, b, c, d, e, f);
    

    return a || b || c || d || e || f    
}

function resetTable(table) {
    table.innerHTML = "";
}


class SearchParams {
    constructor(english, eastern, western, ancient, category, note) {
        this.english = english;
        this.eastern = eastern;
        this.western = western;
        this.ancient = ancient;
        this.category = category;
        this.note = note;
    }

    static all() {
        return new this(true, true, true, true, true, true);
    }

    static english() {
        return new this(true, false, false, false, false, false);
    }

    static eastern() {
        return new this(false, true, false, false, false, false);
    }

    static western() {
        return new this(false, false, true, false, false, false);
    }

    static ancient() {
        return new this(false, false, false, true, false, false);
    }

    static category() {
        return new this(false, false, false, false, true, false);
    }

    static note() {
        return new this(false, false, false, false, false, true);
    }
}






