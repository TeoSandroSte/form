import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material';
import { MockService } from '../mock.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild('snav', {static: false}) snav: MatSidenav;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  form1 = this.formBuilder.group({
    nome: ['mtl', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    cognome: ['stf', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    sesso: ['M', Validators.required],
    nascita: ['', Validators.required],
    fiscale: ['stfmtl93s23l219i', [Validators.required, Validators.pattern('^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$')]],
  });

  form2 = this.formBuilder.group({
    email: ['tent@tet.com', [Validators.required, Validators.email]],
    identita: ['cv1234567', [Validators.required, Validators.pattern('^[a-zA-Z]{2}[0-9]{7}$')]],
    rilascio: ['', Validators.required],
    scadenza: ['', Validators.required],
  });

  form3 = this.formBuilder.group({
    via: [''],
    civico: [''],
    citta: [''],
    provincia: [''],
  });

  date: Date;
  dataSelezionata: Date;

  constructor(private formBuilder: FormBuilder, private richiesta: MockService) { }

  ngOnInit() {
    this.date = new Date();
    this.dataSelezionata = new Date( new Date().setDate(this.date.getDate() - 1));
    console.log(typeof this.dataSelezionata);
    console.log(this.dataSelezionata);
  }

  onMenuClicked() {
    console.log('open sidenav');
    this.snav.toggle();
  }

  cognomeFiscale(): string {
    let i = 0;
    const stringaCognome: string = this.form1.get('cognome').value.toLowerCase().trim();
    let stringaConsonanti = '';
    let stringaVocali = '';
    let differenza: number;

    for ( i = 0; i < stringaCognome.length; i++) {
      if (stringaCognome[i] !== 'a' && stringaCognome[i] !== 'e' && stringaCognome[i]
      !== 'i' && stringaCognome[i] !== 'o' && stringaCognome[i] !== 'u' && stringaCognome[i] !== ' ') {
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
      if (stringaNome[i] !== 'a' && stringaNome[i] !== 'e' && stringaNome[i]
      !== 'i' && stringaNome[i] !== 'o' && stringaNome[i] !== 'u' && stringaNome[i] !== ' ') {
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
    const anno = new Date(this.form1.get('nascita').value).getFullYear().toString();
    const giorno = new Date(this.form1.get('nascita').value).getDate().toString();
    const giornoFemmina = parseInt(giorno[0], 10) + 4;
    const a = giornoFemmina.toString();
    const mesi = ['a', 'b', 'c', 'd', 'e', 'h', 'l', 'm', 'p', 's', 't'];
    const mesiG = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'S', 'T'];
    const mese: number = new Date(this.form1.get('nascita').value).getMonth() - 1;

    if ( codice[0] === codiceC[0]
      && codice[1] === codiceC[1]
      && codice[2] === codiceC[2]
      && codice[3] === codiceN[0]
      && codice[4] === codiceN[1]
      && codice[5] === codiceN[2]
      && codice[6] === anno[2]
      && codice[7] === anno[3]
      && codice[10] === giorno[1]
      && (this.form1.get('sesso').value === 'F' && codice[9] === a
      || this.form1.get('sesso').value === 'M' && codice[9] === giorno[0])
      && (mesi[mese] === codice[8]
        || mesiG[mese] === codice[8])
      ) {
        return true;
      } else {
        return false;
    }
  }

  data(): boolean {

    if ( this.form1.get('nascita').value < this.date.setHours(0, 0, 0, 0)) {
      return true;
    } else {
      return false;
    }
  }

  data2(): boolean {

    if ( this.form2.get('rilascio').value < this.date.setHours(0, 0, 0, 0)) {
      return true;
    } else {
      return false;
    }
  }

  maggiore(): boolean {
    if (this.form2.get('rilascio').value <  this.form2.get('scadenza').value) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    this.richiesta.salvaDati(this.form1.value, this.form2.value, this.form3.value);
  }

}
