import React, { useState } from 'react';
import {Button, Input, InputGroup, InputGroupAddon, ListGroup, ListGroupItem} from "reactstrap";

const LOCAL_STORAGE_KEY = 'gorevler';

export default function App() {
  let varsayilan = [];

  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saved) varsayilan = JSON.parse(saved);

  const [gorevler, setGorevler] = useState(varsayilan);
  const [aciklama, setAciklama] = useState('');

  function tamamlandiYap(acik) {
    const yeni = gorevler.map(gorev => {
        if (gorev.aciklama === acik) {
          return {aciklama: acik, durum: 1};
        }
        return gorev;
      });
    setGorevler(yeni);
    gorevleriKaydet(yeni);
  }

  function ekle() {
    let exist = false;
    gorevler.map(gorev => {
      if (gorev.aciklama === aciklama) {
        exist = true;
      }
      return gorev;
    });
    if (exist){
      alert('Bu gorev mevcut!');
      return;
    }
   
    const yeni = gorevler.map(gorev => gorev);
    const eklenecek = {aciklama,durum:0};

    yeni.push(eklenecek);
    setGorevler(yeni);
    gorevleriKaydet(yeni);
    setAciklama('');
  }

  function sil(acik) {
    if (!window.confirm('Silmek istediginden emin misin?')) return;
    const yeni = gorevler.filter(gorev => gorev.aciklama !== acik);
    setGorevler(yeni);
    gorevleriKaydet(yeni);
  }

  function gorevleriKaydet(value) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
}

  return (
      <div>
        <ListGroup>
          {gorevler.map((gorev,index) =>
              <ListGroupItem key = {index}>

                <Button color="link" disabled={!!gorev.durum} onClick={() => tamamlandiYap(gorev.aciklama)}>
                  <img src={require('./images/ok.jpg')} className="card-img-top" alt="..." style={{height:"20px", width:"20px"}} />
                </Button>
                <Button color="link" className="ml-0" onClick={() => sil(gorev.aciklama)}>
                  <img src={require('./images/sil.png')} className="card-img-top" alt="..." style={{height:"20px", width:"20px"}} />
                </Button>
                <span className="ml-0" style={{textDecoration: gorev.durum ? 'line-through' : ''}}>{gorev.aciklama}</span>
              </ListGroupItem>
          )}

        </ListGroup>

        <InputGroup>
          <Input value = {aciklama} onChange={e =>setAciklama(e.target.value)} placeholder="Gorevi giriniz..." />
          <InputGroupAddon addonType="append">
            <Button color="secondary" onClick={() => ekle()} disabled={aciklama===''}>Ekle</Button>
          </InputGroupAddon>
        </InputGroup>

      </div>
  );
}