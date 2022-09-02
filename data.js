function getData(){
    fetch("badi.json").then(rsp => rsp.json().then(object => {

        const badis = object.pools;
        var badisTable = document.getElementById("badisTable");

        badis.sort(compare);

        for (let i in badis){
            var div = document.createElement("div");
            var aLink = document.createElement("a");
            var badiInfo = document.createElement("table");


            badiInfo.insertRow(-1).innerText = badis[i].name;

            var celcius = badiInfo.insertRow(-1);
            celcius.innerText = "Wassertemperatur: "+(Math.round((badis[i].temperature)*10)/10)+"°C";
            celcius.style.color = "rgb(100,"+(100+(5*badis[i].temperature))+","+(255-(5*badis[i].temperature))+")";

            var farenheit = badiInfo.insertRow(-1);
            farenheit.innerText = "Wassertemperatur: "+(Math.round(((badis[i].temperature*(9/5))+32)*10)/10)+"°F";
            farenheit.style.color = "rgb(100,"+(100+(5*badis[i].temperature))+","+(255-(5*badis[i].temperature))+")";

            badiInfo.insertRow(-1).innerText = "Zuletzt Erneuert: "+badis[i].updatedAt;

            badiInfo.insertRow(-1).innerText = badis[i].openText;

            aLink.href = badis[i].url;
            aLink.appendChild(badiInfo);
            div.appendChild(aLink);
            badisTable.appendChild(div);

        }
    }));
}

function compare(badi1,badi2){
    if (badi1.open && badi2.open === false){
        return -1;
    }else if(badi1.open === false && badi2.open){
        return 1;
    }else{
        return 0;
    }
}