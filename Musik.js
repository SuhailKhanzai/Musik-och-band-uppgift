const prompt = require('prompt-sync')({ sigint: true });

class Artist {
  constructor(name, birthYear) {
    this.name = name
    this.birthYear = birthYear
  }
}

class Band {
  constructor(name, artists) {
    this.name = name
    this.artists = artists
  }
}


let bands = []
let artists = []

while (true) {
  if (runProgram() == false) {
    break
  }
}

function runProgram() {
  
  let alternative = printMenu()

  
  switch (alternative) {
    case "0":
     
      return false

    case "1":
      
      let band = addBand()

      
      bands.push(band)

      console.log("Skapade bandet " + band.name)
      break;

    case "2":
      
      let artist = addArtist()

      artists.push(artist.artist)

      let addedArtistToBand = false

    
      for (let i = 0; i < bands.length; i++) {
        
        if (bands[i].name == artist.band) {
          
          bands[i].artists.push(artist.artist.name)

          console.log("La till artisten " + artist.artist.name + " i bandet " + artist.band)

          addedArtistToBand = true
        }
      }

      if (addedArtistToBand == false) {
        let band = new Band(artist.band, [artist.artist.name])

        bands.push(band)

        console.log("Skapade bandet " + artist.band + " och la till artisten " + artist.artist.name)
      }

      break;

    case "3":
      // Fråga användaren om bandets namn
      let bandToRemove = prompt('Ta bort ett band: ')

      let removedBand = false

      for (let i = 0; i < bands.length; i++) {
        
        if (bands[i].name == bandToRemove) {
          console.log("Tog bort bandet " + bands[i].name)
          removedBand = true
          
          bands.splice(i, 1)
        }
      }

      if (removedBand == false) {
        console.log("Fel - angivna namnet matchade inget band")
      }

      break;

    case "4":
      let RemoveArtist = prompt('Ta bort en artist: ')

      let removedArtist = false

     
      for (let i = 0; i < bands.length; i++) {
        
        for (let j = 0; j < bands[i].artists.length; j++) {
          if (bands[i].artists[j] == RemoveArtist) {
            bands[i].artists.splice(j, 1)

            console.log("Tog bort " + RemoveArtist + " från bandet " + bands[i].name)
          }
        }
      }

      for (let i = 0; i < artists.length; i++) {
        if (artists[i].name == RemoveArtist) {
          artists.splice(i, 1)
          removedArtist = true
        }
      }

      if (removedArtist == false) {
        console.log("Fel - angivna namnet matchade ingen artist")
      }

      break;

    case "5":
      let artistName = prompt("Namn på artisten: ")
      let bandName = prompt("Namn på bandet: ")

      
      for (let i = 0; i < bands.length; i++) {
        if (bands[i].name == bandName) {
          
          for (let j = 0; j < bands[i].artists.length; j++) {
            if (bands[i].artists[j] == artistName) {
              bands[i].artists.splice(j, 1)

              console.log("Tog bort " + artistName + " från bandet " + bands[i].name)
            }
          }
        }
      }

      break;

    case "6":
      let artistName2 = prompt("Namn på artisten: ")
      let belongsToBands = []
      let birthYear = 0

      for (let i = 0; i < bands.length; i++) {
        for (let j = 0; j < bands[i].artists.length; j++) {
          if (bands[i].artists[j] == artistName2) {
            belongsToBands.push(bands[i].name)
          }
        }
      }

      for (let i = 0; i < artists.length; i++) {
        if (artists[i].name == artistName2) {
          birthYear = artists[i].birthYear
        }
      }

      console.log("Artisten tillhör banden: " + belongsToBands.join(", "))
      console.log("Artistens ålder är: " + (2023 - birthYear))

      break;

    case "7":
      let bandName2 = prompt("Namn på bandet: ")

      for (let i = 0; i < bands.length; i++) {
        if (bands[i].name == bandName2) {
          console.log("Bandet har medlemmarna: " + bands[i].artists.join(", "))
        }
      }

      break;

    default:
      console.log("Fel - angiven text matchade inget alternativ.")
      break;
  }

  // Returnera true - vilket betyder att programmet borde forsätta köra
  return true
}

// Definierar en funktion 'printMenu', vars roll är att printa en meny och läsa in användarens val
function printMenu() {
  console.log("0. Avsluta programmet")
  console.log("1. Lägg till ett band")
  console.log("2. Lägg till en artist")
  console.log("3. Ta bort ett band")
  console.log("4. Ta bort en artist")
  console.log("5. Ta bort en artist från ett band")
  console.log("6. Artistens ålder")
  console.log("7. Band information")

  
  let alternative = prompt("Välj ett alternativ: ")

  // Returnerar vi den text användaren skrev in
  return alternative
}


function addBand() {
 
  let bandName = prompt('Lägg till ett band: ');
  console.log(`La till bandet ${bandName}!`);

  
  let band = new Band(bandName, [])

  return band
}

function addArtist() {
  let artist = prompt('Lägg till en artist: ');
  console.log(`La till artist ${artist}!`);

  let belongsToBand = prompt('Ange bandet som artisten tillhör: ')

  let birthYear = prompt("Ange artistens födelseår: ")

  return { band: belongsToBand, artist: new Artist(artist, birthYear) }
} 
