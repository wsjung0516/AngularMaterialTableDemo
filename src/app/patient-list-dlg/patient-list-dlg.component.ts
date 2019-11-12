import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-patient-list-dlg',
  template: `
      <div class="container">
          <div align="center">
              <h3>환자 목록</h3>
          </div>
          <br/>
          <div style="overflow: scroll; height: 500px">
              <table class="table table-fixed table-bordered">
                  <thead>
                  <tr>
                      <th>ID</th>
                      <th>email</th>
                      <th>이름</th>
                      <th>생년월일</th>
                      <th>성별</th>
                      <th>연락처</th>
                      <th>등록일</th>
                      <th>가입일</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>11111</td>
                      <td>john@example.com</td>
                      <td>홍길동</td>
                      <td>2019.01.01</td>
                      <td>남자</td>
                      <td>010****5678</td>
                      <td>2019/01/01</td>
                      <td>2019/01/01</td>
                  </tr>
                  </tbody>
              </table>
          </div>
      </div>
      <br/>
      <div align="center">
          <button type="button" class="btn btn-primary">닫 기</button>
      </div>
  `,
  styles: [
      `
      .btn-primary {
          width: 80px;
      }
      table {
          width: 100%;
          margin: 0 auto;
          border-collapse: collapse;
      }

      th {
          background-color: #bbdefb;
      }

      td {
          border: 1px solid #DDD;
          text-align: left;
          padding: 8px;

      }

      tr:nth-child(even) {
          background-color: #e3f2fd;
      }
    `
  ]
})
export class PatientListDlgComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
