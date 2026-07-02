let nivel = process.argv[2];

if((nivel >= 1) && (nivel <= 10)) {
    console.log("Nível: Iniciante");
}

if((nivel >= 11) && (nivel <= 30)) {
    console.log("Nível: Intermediario");
}

if(nivel >= 31){
    console.log("Nível: Veterano");
}