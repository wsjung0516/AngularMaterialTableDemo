import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dlg',
  template: `
<!--
      <mat-card style="height: 400px; width: 650px" class="card text-left">
          <mat-card-header style="height:50px; width:100%; background:#f5f5f5; margin-bottom: 20px">
              <div class="container" >
              <div class="row">
                  <div class="col-sm-6" style="position: relative; top: 5px; left: -20px" >
                      <h4>자격면허 인증</h4>
                  </div>
                      <div class="col-sm-6">
                         <span style="position: relative; top: 15px; float:right" (click)="onNoClick()">X</span>
                      </div>
              </div>
                  
              </div>
              
          </mat-card-header>
          <mat-card-content>
              <form>
                  <div class="form-group row">
                      <label for="input1" class="col-sm-3 col-form-label">이 름</label>
                      <div class="col-sm-9">
                          <input type="text" value="{{data.name}}" class="form-control" id="input1" placeholder="">
                      </div>
                  </div>
                  <div class="form-group row">
                      <label for="input2" class="col-sm-3 col-form-label">자격면허번호</label>
                      <div class="col-sm-9">
                          <input type="text" value="{{data.license}}" class="form-control" id="input2" placeholder="">
                      </div>
                  </div>
                  <div class="form-group row">
                      <label for="input2" class="col-sm-3 col-form-label">인증여부</label>
                      <div class="col-sm-9">
                          <div style="text-align: left">
                              <div>
                                  <mat-radio-group [(ngModel)]="radioOptions" [ngModelOptions]="{standalone: true}" >
                                      <mat-radio-button  value="1"><span style="margin-right: 30px">인증완료</span></mat-radio-button>
                                      <mat-radio-button  value="0"><span style="margin-right: 30px">미인증</span></mat-radio-button>
                                      <mat-radio-button  value="2"><span style="margin-right: 30px">인증불가</span></mat-radio-button>
                                  </mat-radio-group>
                              </div>
                          </div>
                      </div>
                  </div>
                  <br/>
                  <fieldset class="form-group">
                      <h6>자격면허정보가 회원정보와 동인한 경우에만 인증완료를 선택해 주세요.</h6>
                      <h6>- 인증부가 : 등록된 자격면허 정보가 면허 번호 양식에 맞지 않는 경우</h6>
                      <h6>- 미인증 : 인증을 수행하지 않은 상태</h6>
                  </fieldset>
                  <div style="bottom:20px; float: right">
                          <button type="button" class="btn btn-defalut" style="background:lightgray ;margin-right: 10px; width: 80px" (click)="onNoClick()">취소</button>
                          <button type="button" class="btn btn-primary" (click)="onYesClick()">저장하기</button>
                      </div>
                  <div class="form-group row">
                  </div>
              </form>
          </mat-card-content>
      </mat-card>
-->
  `,
  styles: []
})
export class ConfirmDlgComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
