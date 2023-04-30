/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Button, Row, FormGroup, Input, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Col} from "reactstrap";

var authors = [];
var quotes = [];
const channelIDs = {
    "#tim": "688045975595515905",
    "#marlon": "688045994830725149",
    "#fabian": "709107013585469540",
    "#daniel": "709107033520996372",
    "#tobias": "709107049664872508",
    "#paul": "748897042742509618",
    "#random": "716017385165029406"
}

function Quotes() {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => {
        setIsOpen(prevState => !prevState);
        console.log(isOpen);
    }
    const [selectedChannel, setSelectedChannel] = React.useState("#tim");
    const toggleSelected = (text) => setSelectedChannel(text);
    
    const [quoteForms, setQuoteForms] = React.useState([<QuoteForm index={1}/>]);
    const addForm = () => {
        setQuoteForms(oldQuoteForms => [...oldQuoteForms, <QuoteForm index={oldQuoteForms.length + 1}/>])
    }
    const removeForm = () => {
        var forms = [...quoteForms];
        forms.splice(forms.length - 1, 1);
        setQuoteForms(forms);
        authors = authors.slice(0,-1);
        quotes = quotes.slice(0,-1);
    }

    const submitForm = () => {
        var authorStr = "", quoteStr = "";
        for(var i = 0; i < authors.length; i++){
            authorStr +=  "|" + authors[i];
            quoteStr +=  "|" + quotes[i];
        }
        const query = `https://us-central1-quoty-bot.cloudfunctions.net/app/api/quote?authors=${authorStr}&quotes=${quoteStr}&channelID=${channelIDs[selectedChannel]}`;
        console.log(query);
        fetch(query, {mode:'cors'})
        .then(response => response.json())
        .then(fetchedData => {
            console.log(fetchedData);
        })
    }

    return (
    <div className="content">
        <Row>
            <Col>
                <Dropdown isOpen={isOpen} toggle={toggle} style={{width:'100%'}}>
                    <DropdownToggle style={{width:'100%'}}>{selectedChannel}</DropdownToggle>
                    <DropdownMenu style={{width:'100%'}}>
                        <DropdownItem style={{width:'100%'}} onClick={() => toggleSelected("#tim")}>#tim</DropdownItem>
                        <DropdownItem style={{width:'100%'}} onClick={() => toggleSelected("#marlon")}>#marlon</DropdownItem>
                        <DropdownItem style={{width:'100%'}} onClick={() => toggleSelected("#fabian")}>#fabian</DropdownItem>
                        <DropdownItem style={{width:'100%'}} onClick={() => toggleSelected("#daniel")}>#daniel</DropdownItem>
                        <DropdownItem style={{width:'100%'}} onClick={() => toggleSelected("#tobias")}>#tobias</DropdownItem>
                        <DropdownItem style={{width:'100%'}} onClick={() => toggleSelected("#paul")}>#paul</DropdownItem>
                        <DropdownItem style={{width:'100%'}} onClick={() => toggleSelected("#random")}>#random</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Col>
        </Row>
        {quoteForms}
        <Row>
            <Col>
                <Button onClick={addForm} style={{width:'100%'}} disabled={quoteForms.length > 5}>Add</Button>
            </Col>
            <Col>
                <Button onClick={removeForm} style={{width:'100%'}} disabled={quoteForms.length <= 1}>Remove</Button>
            </Col>
        </Row>
        <Row>
            <Col>
                <Button onClick={submitForm} style={{width:'100%'}}>Submit Quote</Button>
            </Col>
        </Row>
    </div>
    );
}

function QuoteForm({index}){

    const onAuthorChange = (text) => authors[index - 1] = text;
    const onQuoteChange = (text) => quotes[index - 1] = text;
    return(
        <Row>
            <Col sm="2">
                <FormGroup>
                    <label>Author #{index}</label>
                    <Input
                        onChange={(e) => onAuthorChange(e.target.value)}
                        placeholder={`Author ${index}`}
                        type="text"
                    />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <label>Quote #{index}</label>
                    <Input
                        onChange={(e) => onQuoteChange(e.target.value)}
                        placeholder={`Quote ${index}`}
                        type="text"
                    />
                </FormGroup>
            </Col>
        </Row>
    );
}

export default Quotes;
