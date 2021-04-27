import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ConfigService } from 'src/app/services/config.service';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  selectedquote
  number
  quotes
  years = Array()
  year
  thisyear
  num = 0
  searchKey

  constructor(private quoteService : QuoteService
    ,private toastr:ToastrService ,
    private configService : ConfigService ,
   private router : Router) { }

   ngOnInit(): void {

    for ( let i = 2017 ;  i < 2050 ; i++  )
    {
      this.years.push({
       year : i
      })}

    this.thisyear = new Date().getFullYear()
    this.quoteService.getQuotes().subscribe(
    res=>{
      this.quotes = res.quotes
        },err=>{
      console.log(err)
    })}

    addQuote(){this.router.navigate(['/addQuote'])}
    updatequote(id){ this.router.navigate(['/updateQuote', id])}
    deleteQuote(){
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do You Really Want To Delete The quotes!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {

          let quotes_id = []
          this.selectedquote.map(el=>{
            quotes_id.push({
            "quote_id": el.id
          })
          })
          this.quoteService.deleteQuote(quotes_id).subscribe(
            res=>{
              this.toastr.success('Quotes is deleted')
              this.ngOnInit()
            }, err=>{
              console.log(err)
            }
            )
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success',
            )

          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Your file is safe :)',
              'error'
            )}})}
    filterActions(action_name,space_name)
    {
    if( this.configService.filterActions(action_name,space_name)){
      return true
    }else{
      return false
    }
    }
}
