import { Component } from "@angular/core";
@Component({
    selector: 'app-footer',
    template:`
        <footer class="row darkBG">

            <div class="text-center footergebied">
                <h5 i18n>CONTACTEER ONS</h5>
                <ol>
                    <li>LGU Academy</li>
                    <li>Noordersingel 28 - 30</li>
                    <li>2140 Antwerpen</li>
                    <li>M: <a href="mailto:info@letsgourban.be">info@letsgourban.be</a></li>
                </ol>
            </div>

            <p>&nbsp;<p>

            <div class="text-center">
                <div class="social">
                    <ul class="clearfix">
                        <li><a href="https://twitter.com/Letsgourban" target="_blank"><i class="fa fa-twitter fa-2x"></i><span class="sr-only">Twitter</span></a></li>
                        <li><a href="https://www.facebook.com/letsgourban/?fref=ts" target="_blank"><i class="fa fa-facebook fa-2x"></i><span class="sr-only">Facebook</span></a></li>
                        <li><a href="https://www.instagram.com/letsgourban/" target="_blank"><i class="fa fa-instagram fa-2x"></i><span class="sr-only">Instagram</span></a></li>
                    </ul>
                </div>
            </div>


            <div><p>&nbsp;<p></div>

            <div class="credits text-center">
                <p>Created by Team 2</p>
            </div>
        </footer>
    `,
    styles: [`
        footer {
            padding-top: 25px;
        }
        i.fa:hover {
            color: #CEB64A;
        }
    `]
})
export class FooterComponent{}