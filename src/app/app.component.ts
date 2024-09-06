import { Component, ViewChild } from '@angular/core';
import { ApiIBService } from './api-ib.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BvsComponent } from './components/bvs/bvs.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  searchResult: any;
  processResult: any | string;
  searchProcess: boolean = false;
  valueTerm: number = 0

  constructor(
    private apiService: ApiIBService,
    private toastr: ToastrService
  ) {}

  onSubmit(form: NgForm) {
    this.searchProcess = true;
    if (form.value.linkPortugues == '' || form.value.linkPortugues == null) {
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

    if (form.value.linkEnglish != '' && form.value.linkEnglish != null) {
      this.apiService.search(form.value.linkEnglish, 'english').subscribe(
        (responseEnglish) => {
          // Se a busca em inglês for bem-sucedida, faça a busca em português
          this.apiService
            .search(form.value.linkPortugues, 'portuguese')
            .subscribe(
              (responsePortuguese) => {
                // Se a busca em português também for bem-sucedida
                this.searchResult = {
                  english: responseEnglish,
                  portuguese: responsePortuguese,
                };

                // Agora processe os resultados
                this.apiService
                  .process(
                    form.value.spanishDescription,
                    form.value.frenchDescription,
                    form.value.typeSearch
                  )
                  .subscribe(
                    (responseProcess) => {
                      // console.log('Process Result:', responseProcess);
                      this.processResult = responseProcess.result;
                      this.searchProcess = false;
                      this.toastr.success(
                        'Busca realizada com sucesso',
                        'Resultado'
                      );
                    },
                    (error) => {
                      console.log('Erro ao processar:', error);
                      this.toastr.error(error.error.error, 'Error');
                      this.searchProcess = false;
                    }
                  );
              },
              (error) => {
                // Trate o erro da busca em português
                console.log('Erro na busca em português:', error);
                this.toastr.error(error.error.error, 'Error');
                this.searchProcess = false;
              }
            );
        },
        (error) => {
          // Trate o erro da busca em inglês
          console.log('Erro na busca em inglês:', error);
          this.toastr.error(error.error.error, 'Error');
          this.searchProcess = false;
        }
      );
    } else {
      this.apiService.search(form.value.linkPortugues, 'portuguese').subscribe(
        (responsePortuguese) => {
          // Se a busca em português também for bem-sucedida
          this.searchResult = {
            english: null,
            portuguese: responsePortuguese,
          };

          // Agora processe os resultados
          this.apiService
            .process(
              form.value.spanishDescription,
              form.value.frenchDescription,
              form.value.typeSearch
            )
            .subscribe(
              (responseProcess) => {
                // console.log('Process Result:', responseProcess);
                this.processResult = responseProcess.result;
                this.searchProcess = false;
                this.toastr.success('Busca realizada com sucesso', 'Resultado');
              },
              (error) => {
                console.log('Erro ao processar:', error);
                this.toastr.error(error.error.error, 'Error');
                this.searchProcess = false;
              }
            );
        },
        (error) => {
          // Trate o erro da busca em português
          console.log('Erro na busca em português:', error);
          this.toastr.error(error.error.error, 'Error');
          this.searchProcess = false;
        }
      );
    }
  }

  copyToClipboard() {
    if (this.processResult !== null) {
      const textarea = document.createElement('textarea');
      textarea.value = this.processResult;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      // Trocar para toash quando estiver utilizando ele certinho
      // alert('Texto copiado para a área de transferência!');
    }
  }

}
