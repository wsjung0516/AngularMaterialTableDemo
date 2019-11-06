import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dlg',
  template: `
      <div style="height: 400px; width: 650px" class="card text-left">
          <div class="card-header" style="text-align: left" >
              <div>
                  <strong>자격면허 인증</strong>
                  <span style="float:right">X</span>
              </div>
          </div>
          <div class="card-body">
              <form>
                  <div class="form-group row">
                      <label for="input1" class="col-sm-3 col-form-label">이 름</label>
                      <div class="col-sm-9">
                          <input type="text" class="form-control" id="input1" placeholder="">
                      </div>
                  </div>
                  <div class="form-group row">
                      <label for="input2" class="col-sm-3 col-form-label">자격면허번호</label>
                      <div class="col-sm-9">
                          <input type="text" class="form-control" id="input2" placeholder="">
                      </div>
                  </div>
                  <fieldset class="form-group">
                      <div class="row">
                          <legend class="col-form-label col-sm-3 pt-0">인증여부</legend>
                          <div class="col-sm-9">
                              <div style="text-align: left">
                                  <div>
                                    <mat-radio-button><span style="margin-right: 30px">인증완료</span></mat-radio-button>
                                    <mat-radio-button><span style="margin-right: 30px">미인증</span></mat-radio-button>
                                    <mat-radio-button><span style="margin-right: 30px">인증불가</span></mat-radio-button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </fieldset>
                  <br/>
                  <fieldset class="form-group">
                      <h6>자격면허정보가 회원정보와 동인한 경우에만 인증완료를 선택해 주세요.</h6>
                      <h6>- 인증부가 : 등록된 자격면허 정보가 면허 번호 양식에 맞지 않는 경우</h6>
                      <h6>- 미인증 : 인증을 수행하지 않은 상태</h6>
                  </fieldset>
                  <div style="bottom:20px; float: right">
                          <button type="button" class="btn btn-secondary" style="margin-right: 10px; width: 80px">취소</button>
                          <button type="button" class="btn btn-primary">저장하기</button>
                      </div>
                  <div class="form-group row">
                  </div>
              </form>
          </div>
      </div>
  `,
  styles: []
})
export class ConfirmDlgComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
