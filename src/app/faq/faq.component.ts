import {AfterContentInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements AfterContentInit {




  constructor() {

  }

  ngAfterContentInit(): void {
    const faqs = document.querySelectorAll(".faq");
    faqs.forEach(faq => {
      faq.addEventListener("click", () => {
        faq.classList.toggle("active");
      })
    })
  }

}
