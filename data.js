/*
    reads the data and writes it to a tab table
 */
function getData(){
    fetch("badi.json").then(rsp => rsp.json().then(object => {

        const badis = object.pools;
        var badisTable = document.getElementById("badisTable");

        badis.sort(compare);

        for (let i in badis){
            var div = document.createElement("div");
            div.classList.add("divBack");
            var aLink = document.createElement("a");
            var badiInfo = document.createElement("table");


            var badiName = badiInfo.insertRow(-1);
            badiName.classList.add("badiName");
            badiName.innerText = badis[i].name;

            var celcius = badiInfo.insertRow(-1);
            celcius.innerText = "Wassertemperatur: "+(Math.round((badis[i].temperature)*10)/10)+"°C / "+(Math.round(((badis[i].temperature*(9/5))+32)*10)/10)+"°F";
            celcius.style.color = "rgb(100,"+(100+(5*badis[i].temperature))+","+(255-(5*badis[i].temperature))+")";

            badiInfo.insertRow(-1).innerText = "Erneuert vor "+(dhms(Date.now()-convertDate(badis[i].updatedAt)));

            if (badis[i].open === true){
                badiInfo.insertRow(-1).innerText = badis[i].openText;
            }else{
                var badiClosed = badiInfo.insertRow(-1);
                badiClosed.innerText = badis[i].openText;
                div.classList.add("badiClosed");

            }


            aLink.href = badis[i].url;
            aLink.appendChild(badiInfo);
            div.appendChild(aLink);
            badisTable.appendChild(div);
        }
    }));
}

/*
    converts the date
 */
function convertDate(date){
    const splitAll = date.split(' ');
    const splitDate = splitAll[1].split('.')
    const formateDate = splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0]+"T"+splitAll[2]+":00";
    return new Date(formateDate).getTime();
}

/*
    This piece of code is from: https://codereview.stackexchange.com/q/216914
    It converts milliseconds to days hours minutes and seconds.
 */
function dhms(t) {
        d = Math.floor(t / (1000 * 60 * 60 * 24)),
        h = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)),
        s = Math.floor((t % (1000 * 60)) / 1000);

        var fullTime = "";



    if (h<10){
        fullTime += "0"+h;
    }else{
        fullTime += h;
    }

    if (m<10){
        fullTime += ":0"+m;
    }else{
        fullTime += ":"+m;
    }

    if (s<10){
        fullTime += ":0"+s;
    }else{
        fullTime += ":"+s;
    }

    return d+" Tagen und "+fullTime;
}
/*
    compares two swimming pools if they are open and moves the closed ones to the end.
 */
function compare(badi1,badi2){
    if (badi1.open && badi2.open === false){
        return -1;
    }else if(badi1.open === false && badi2.open){
        return 1;
    }else{
        return 0;
    }
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}