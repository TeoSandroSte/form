import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form1 = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    cognome: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    sesso: ['', Validators.required],
    nascita: ['', Validators.required],
    fiscale: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$')]],
  })

  form2 = this.formBuilder.group({
    email: ['', Validators.required],
    identita: ['', Validators.required],
    rilascio: ['', Validators.required],
    scadenza: ['', Validators.required],
  })

  form3 = this.formBuilder.group({
    email: [''],
    via: [''],
    civico: [''],
    citta: [''],
    provincia: [''],
  })

  date = new Date()

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  cognomeFiscale(): string {
    let i = 0;
    const stringaCognome: string = this.form1.get('cognome').value.toLowerCase().trim();
    let stringaConsonanti = '';
    let stringaVocali = '';
    let differenza: number;

    for ( i = 0; i < stringaCognome.length; i++) {
      if (stringaCognome[i] !== 'a' && stringaCognome[i] !== 'e' && stringaCognome[i] !== 'i' && stringaCognome[i] !== 'o' && stringaCognome[i] !== 'u' && stringaCognome[i] !== ' ') {
        stringaConsonanti += stringaCognome[i];
      } else {
        if (stringaCognome[i] !== ' ') {
          stringaVocali += stringaCognome[i];
        }
      }
    }
    if (stringaConsonanti.length < 3) {
      differenza = 3 - stringaConsonanti.length;
      if (differenza === 3) {
        if (stringaVocali.length === 2) {
          return stringaVocali + 'x';
        } else {
        return stringaVocali[0] + stringaVocali[1] + stringaVocali[2];
        }
      } else if (differenza === 2) {
        if (stringaVocali.length === 1) {
          return stringaConsonanti[0] + stringaVocali[0] + 'x';
        }
        return stringaConsonanti[0] + stringaVocali[0] + stringaVocali[1];
      } else if (differenza === 1) {
        if ( stringaVocali.length === 0 ) {
          return stringaConsonanti[0] + stringaConsonanti[1] + 'x';
        }
        return stringaConsonanti[0] + stringaConsonanti[1] + stringaVocali[0];
      }
    } else {
      return stringaConsonanti[0] + stringaConsonanti[1] + stringaConsonanti[2];
    }
  }

  nomeFiscale(): string {
    let i = 0;
    const stringaNome: string = this.form1.get('nome').value.toLowerCase().trim();
    let stringaConsonanti = '';
    let stringaVocali = '';
    let differenza: number;

    for ( i = 0; i < stringaNome.length; i++) {
      if (stringaNome[i] !== 'a' && stringaNome[i] !== 'e' && stringaNome[i] !== 'i' && stringaNome[i] !== 'o' && stringaNome[i] !== 'u' && stringaNome[i] !== ' ') {
        stringaConsonanti += stringaNome[i];
      } else {
        if (stringaNome[i] !== ' ') {
          stringaVocali += stringaNome[i];
        }
      }
    }
    if (stringaConsonanti.length < 3) {
      differenza = 3 - stringaConsonanti.length;
      if (differenza === 3) {
        if (stringaVocali.length === 2) {
          return stringaVocali + 'x';
        } else {
        return stringaVocali[0] + stringaVocali[1] + stringaVocali[2];
        }
      } else if (differenza === 2) {
        if (stringaVocali.length === 1) {
          return stringaConsonanti[0] + stringaVocali[0] + 'x';
        }
        return stringaConsonanti[0] + stringaVocali[0] + stringaVocali[1];
      } else if (differenza === 1) {
        if ( stringaVocali.length === 0 ) {
          return stringaConsonanti[0] + stringaConsonanti[1] + 'x';
        }
        return stringaConsonanti[0] + stringaConsonanti[1] + stringaVocali[0];
      }
    } else {
      if (stringaConsonanti.length === 3) {
      return stringaConsonanti;
      } else {
        return stringaConsonanti[0] + stringaConsonanti[2] + stringaConsonanti[3];
      }
    }
  }

  controlloCodice(): boolean {
    const codice: string = this.form1.get('fiscale').value;
    const codiceC = this.cognomeFiscale();
    const codiceN = this.nomeFiscale();

    /*const data: string = this.form1.get('birthday').value;*/
    if ( codice[0] === codiceC[0]
      && codice[1] === codiceC[1]
      && codice[2] === codiceC[2]
      && codice[3] === codiceN[0]
      && codice[4] === codiceN[1]
      && codice[5] === codiceN[2]) {
        /*if ( this.form1.get('genderm').value === 'F' && stringaCf[9] === new String( parseInt(data[8], 10) + 4))  {
          return true;
        } else if (this.form1.get('genderm').value === 'M' && stringaCf[9] === data[8]) {
        return true;
        } else {
          return false;
        }*/
        return true;
      } else {
        return false;
    }
  }

  data(): boolean {
    if ( new Date(this.form1.get('nascita').value) < this.date) {
      return true;
    } else {
      return false;
    }
  }

  prova(): boolean {
    if (this.form2.get('rilascio').value < this.form2.get('scadenza').value) {
      return true;
    } else {
      return false;
    }
  }

}
