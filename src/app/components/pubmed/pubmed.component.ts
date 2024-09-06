import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiIBService } from 'src/app/api-ib.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-pubmed',
  standalone: true,
  imports: [FormsModule, BrowserModule],
  templateUrl: './pubmed.component.html',
  styleUrl: './pubmed.component.css',
})
export class PubmedComponent implements OnInit {
  searchResult: any;
  result: any | string;
  searchProcess: boolean = false;
  valueTerm: number = 0;

  constructor(
    private apiService: ApiIBService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const element = document.getElementById('PubMedComponent');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSubmit(form: NgForm) {
    this.searchProcess = true;
    this.result = null

    form.value.linkPubMed = form.value.linkPubMed.trim()

    if (form.value.linkPubMed == '' || form.value.linkPubMed == null) {
      console.log(
        'Não foi possivel fazer a buscar caso o campo de busca em português esteja vazio'
      );
      this.toastr.error(
        'Não foi possivel fazer a buscar caso o campo de busca em português esteja vazio',
        'Error'
      );
      this.searchProcess = false;
      return;
    }

    this.apiService
      .searchPubMed(form.value.linkPubMed)
      .subscribe(
        (responseProcess: any) => {
          // console.log('Process Result:', responseProcess);
          this.result = responseProcess.result;
          this.searchProcess = false;
          this.toastr.success('Busca realizada com sucesso', 'Resultado');
        },
        (error) => {
          console.log('Erro ao processar:', error);
          this.toastr.error(error.error.error, 'Error');
          this.searchProcess = false;
        }
      );
  }

  copyToClipboard() {
    if (this.result !== null) {
      const textarea = document.createElement('textarea');
      textarea.value = this.result;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      // Trocar para toash quando estiver utilizando ele certinho
      // alert('Texto copiado para a área de transferência!');
    }
  }
}
