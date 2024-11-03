import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.css'
})
export class QuotesComponent implements OnInit {

  quotes: string[] = [];
  newQuote: string = '';
  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    const storedQuotes = localStorage.getItem('quotes');
    this.quotes = storedQuotes ? JSON.parse(storedQuotes) : [];
  }

  editQuote(index: number): void {
    const updatedQuote = prompt("Edit quotes:", this.quotes[index]);
    if (updatedQuote !== null) {
      this.quotes[index] = updatedQuote;
      this.updateLocalStorage();
    }
  }

  deleteQuote(index: number): void {
    this.quotes.splice(index, 1);
    this.updateLocalStorage();
  }

  addQuote(): void {
    if (this.newQuote.trim()) {
      this.quotes.push(this.newQuote);
      this.updateLocalStorage();
      this.newQuote = '';
    }
  }

  updateLocalStorage(): void {
    localStorage.setItem('quotes', JSON.stringify(this.quotes));
  }
}
