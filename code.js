'use strict';

const MyImage8 = function(x_, y_){
  const x=x_|0;
  const y=y_|0;
  this.data = new Uint8Array(x*y);
  this.width = x;
  this.height = y;

  this.Get = function(x_, y_){
    const x=x_|0;
    const y=y_|0;
    return this.data[x + y*this.width];
  };
  this.Set = function(x_, y_, color_){
    const x=x_|0;
    const y=y_|0;
    const color=color_ & 0xFF;
    this.data[x + y*this.width]=color;
    return;
  };
}
const MyImageRGBA = function(x_, y_){
  const x=x_|0;
  const y=y_|0;
  this.data = new Uint8Array(x*y*4);
  this.width = x;
  this.hight = y;

  this.Get = function(x_, y_){
    const x=x_|0;
    const y=y_|0;
    const address=(x + y*this.width)*4;
    return this.data[address]<<24+this.data[address+1]<<16+this.data[address+2]<<8+this.data[address+3];
  };
  this.GetR = function(x_, y_){
    const x=x_|0;
    const y=y_|0;
    return this.data[(x + y*this.width)*4];
  };
  this.GetG = function(x_, y_){
    const x=x_|0;
    const y=y_|0;
    return this.data[(x + y*this.width)*4+1];
  }
  this.GetB = function(x_, y_){
    const x=x_|0;
    const y=y_|0;
    return this.data[(x + y*this.width)*4+2];
  };
  this.GetA = function(x_, y_){
    const x=x_|0;
    const y=y_|0;
    return this.data[(x + y*this.width)*4+3];
  };
  this.Set = function(x_, y_, num_){
    const x=x_|0;
    const y=y_|0;
    const num=num_ | 0;
    const address=(x + y*this.width)*4;
    this.data[address]=num>>24;
    this.data[address+1]=num>>16 & 0xFF;
    this.data[address+2]=num>>8 & 0xFF;
    this.data[address+3]=num & 0xFF;
    return;
  };
  this.SetR = function(x_, y_, num_){
    const x=x_|0;
    const y=y_|0;
    const num=num_ & 0xFF;
    this.data[address=(x + y*this.width)*4]=num;
    return;
  };
  this.SetG = function(x_, y_, num_){
    const x=x_|0;
    const y=y_|0;
    const num=num_ & 0xFF;
    this.data[address=(x + y*this.width)*4+1]=num;
    return;
  };
  this.SetB = function(x_, y_, num_){
    const x=x_|0;
    const y=y_|0;
    const num=num_ & 0xFF;
    this.data[address=(x + y*this.width)*4+2]=num;
    return;
  };
  this.SetA = function(x_, y_, num_){
    const x=x_|0;
    const y=y_|0;
    const num=num_ & 0xFF;
    this.data[address=(x + y*this.width)*4+3]=num;
    return;
  };
}



function fileChanged(input) {
  console.log(input);
  for (let i = 0; i < input.files.length; i++) {
    console.log(input.files[i]);
  }
  const reader = new FileReader();
  reader.readAsDataURL(input.files[0]);
  let image = new Image();
  

  reader.onload = () => {
    console.log("aaa");
    image.src = reader.result;
    let canvas = document.querySelector("#canvas");
    let canvas1 = document.querySelector("#canvas1");

    let ctx = canvas.getContext("2d");
    let ctx1 = canvas1.getContext("2d");

    image.onload = () => {
      const w=image.naturalWidth;
      const h=image.naturalHeight;
      canvas.width  = w;
      canvas.height = h;
      canvas1.width  = w;
      canvas1.height = h;

      ctx.drawImage(image, 0, 0);
      console.log("w : "+w+" ,  h :"+h);

      createLogo(w, h, ctx, ctx1);
    };
  };


}
function createLogo(w_, h_, ctx, ctx1) {
  const w=w_|0;
  const h=h_|0;
  let it1=0;
  let it2=0;
  let it3=0;
  let it4=0;
  console.log("ccc");
  alert('ロゴを生成します。この処理には時間がかかる場合があります。');

  let imagedeta = ctx.getImageData(0, 0, w, h);
  let imagedeta1 = ctx1.getImageData(0, 0, w, h);


  let data = imagedeta.data;
  let data1 = imagedeta1.data;


  let image1 = new MyImage8(w,h);
  let image2 = new MyImage8(w,h);
  let image3 = new MyImage8(w,h);
  let image4 = new MyImage8(w,h);
  let image5 = new MyImage8(w,h);
  let image6 = new MyImage8(w,h);
  let image_rgba = new MyImageRGBA(w,h);

  let range_main_min = 9999999;
  let range_main_max = -9999999;
  let range_main1_min = 9999999;
  let range_main1_max = -9999999;
  let range_main2_min = 9999999;
  let range_main2_max = -9999999;

  let range_main_border_min = 9999999;
  let range_main_border_max = -9999999;

  let range_green_min = 9999999;
  let range_green_max = -9999999;

  let range_black_min = 9999999;
  let range_black_max = -9999999;

  let range_black_border_min = 9999999;
  let range_black_border_max = -9999999;

  //色分け
  for(it1=0;it1<w;it1++){
    for(it2=0;it2<h;it2++){
      let r=data[(it1+it2*w)*4  ];//r
      let g=data[(it1+it2*w)*4+1];//g
      let b=data[(it1+it2*w)*4+2];//b
      let a=data[(it1+it2*w)*4+3];//a
      if(r>192 & g>64 & b<64 & a>192){//orange
        image1.Set(it1,it2,1);
        if(range_main_min>it2){
          range_main_min=it2;
        }
        if(range_main_max<it2){
          range_main_max=it2;
        }
      }
      if(r>192 & g<64 & b>192 & a>192){//magenta
        image1.Set(it1,it2,2);
        if(range_main_min>it2){
          range_main_min=it2;
        }
        if(range_main_max<it2){
          range_main_max=it2;
        }
      }
      if(r<64 & g>192 & b<64 & a>192){//green
        image1.Set(it1,it2,3);
        if(range_green_min>it1){
          range_green_min=it1;
        }
        if(range_green_max<it1){
          range_green_max=it1;
        }
      }
      if(r<64 & g<64 & b<64 & a>192){//black
        image1.Set(it1,it2,4);
        if(range_black_min>it2){
          range_black_min=it2;
        }
        if(range_black_max<it2){
          range_black_max=it2;
        }
      }
      if(r>64 & r<192 & g>64 & g<192 & b>64 & b<192 & a>192){//gray
        image1.Set(it1,it2,6);
      }
      if(r>192 & g<64 & b<64 & a>192){//red
        image1.Set(it1,it2,5);
      }
    }
  }

  const rate=(w+h)/2.0/5000;

  Dilation(image1, image2, 43*rate, 3, 255);// white
  marge_image(image2,image1,0,0,0,0,image1.width,image1.height, 3, 3);
  Dilation(image1, image6, 80*rate, 4, 255);// white
  Dilation(image1, image6, 80*rate, 6, 255);// white
  marge_image(image2,image6,1,1+5*rate,1,1,image1.width-1,image1.height-1, 255, 255);

  Dilation(image1, image2, 43*rate, 5, 255);// white

  Dilation(image1, image3, 55*rate, 4, 14);// 
  Dilation(image1, image3, 55*rate, 6, 14);// 
  Dilation(image3, image4, 15*rate, 0, 24);// 
  marge_image(image2,image4,1,1+5*rate,1,1,image1.width-1,image1.height-1, 0, 14);


  marge_image(image2,image1,0,0,0,0,image1.width,image1.height, 4, 4);
  marge_image(image2,image1,0,0,0,0,image1.width,image1.height, 5, 5);

  Dilation(image1, image2, 135*rate, 1, 255);// white
  Dilation(image1, image2, 135*rate, 2, 255);// white
  Dilation(image1, image2, 95*rate, 1, 10);// 
  Dilation(image1, image2, 95*rate, 2, 10);// 
  Dilation(image1, image2, 40*rate, 1, 255);// 
  Dilation(image1, image2, 40*rate, 2, 255);// 

  marge_image(image2,image1,0,0,0,0,image1.width,image1.height, 1, 1);
  marge_image(image2,image1,0,0,0,0,image1.width,image1.height, 2, 2);

  const dot_distance=85*rate;
  it3=0;
  for(it1=0;it1*dot_distance/2<h;it1++){
    if(it3==0){
      it3=1;
    }else{
      it3=0;
    }
    //range_main_min,range_main_max
    let size_d=0;
    let dot_posy=it1*dot_distance/2;
    let dot_posx_offset=it3*dot_distance/2;
    let dot_start = range_main_min+(range_main_max-range_main_min)*210/1000;
    let dot_end = range_main_min+(range_main_max-range_main_min)*700/1000;


    if(dot_start < dot_posy){
      let y=dot_posy-dot_start;
      size_d=y*0.85/(dot_end-dot_start)*dot_distance;
    }
    if(size_d>dot_distance*1.1){
      size_d=dot_distance*1.1;
    }
    
    
    let cl = circleD(size_d);

    for(it2=0;it2*dot_distance<w;it2++){
      let dot_posx=it2*dot_distance+dot_posx_offset;
      marge_image(image5,cl,dot_posx-size_d/2,dot_posy-size_d/2,0,0,size_d,size_d, 255, 1);
    }
  }
  for(it1=0;it1<w;it1++){
    for(it2=0;it2<h;it2++){
      if(image2.Get(it1, it2)==14){
        if(range_black_border_min>it2){
          range_black_border_min=it2;
        }
        if(range_black_border_max<it2){
          range_black_border_max=it2;
        }
      }
      if(image2.Get(it1, it2)==10){
        if(range_main_border_min>it2){
          range_main_border_min=it2;
        }
        if(range_main_border_max<it2){
          range_main_border_max=it2;
        }
      }
    }
  }
  for(it1=0;it1<w;it1++){
    for(it2=0;it2<h;it2++){
      if(image2.Get(it1, it2)==1){
        if(image5.Get(it1, it2)==1){
          image2.Set(it1,it2,21);
        }
      }
      if(image2.Get(it1, it2)==2){
        if(image5.Get(it1, it2)==1){
          image2.Set(it1,it2,22);
        }
      }
    }
  }
  for(it1=0;it1<w;it1++){
    for(it2=0;it2<h;it2++){
      if(image2.Get(it1, it2)==1 | image2.Get(it1, it2)==2){
        if(range_main1_min>it2){
          range_main1_min=it2;
        }
        if(range_main1_max<it2){
          range_main1_max=it2;
        }
      }
      if(image2.Get(it1, it2)==21 | image2.Get(it1, it2)==22){
        if(range_main2_min>it2){
          range_main2_min=it2;
        }
        if(range_main2_max<it2){
          range_main2_max=it2;
        }
      }
    }
  }

  let gradation_10=[[0,224,119,99],[5000,230,94,123],[10000,210,64,162]];
  let gradation_1=[[0,250,234,24],[5000,250,220,28],[10000,252,174,45]];
  let gradation_21=[[0,247,216,9],[5000,247,154,15],[10000,249,109,16]];
  let gradation_2=[[0,252,220,199],[5000,250,179,186],[10000,248,147,182]];
  let gradation_22=[[0,249,155,154],[5000,244,115,146],[10000,241,68,131]];
  let gradation_4=[[0,255,255,255],[5000,253,246,254],[10000,250,228,241]];
  let gradation_14=[[0,152,119,176],[5000,190,130,181],[10000,220,139,182]];
  let gradation_3=[[0,231,172,204],[991,171,134,188],[2007,128,105,173],[3395,172,117,159],[5204,240,147,155],[6517,240,164,168],[8055,241,186,192],[10000,240,200,209]];


  for(it2=0;it2<h;it2++){
    let gradation_10_color=Gradation(gradation_10,it2,range_main_border_min,range_main_border_max);
    let gradation_1_color=Gradation(gradation_1,it2,range_main1_min,range_main1_max);
    let gradation_21_color=Gradation(gradation_21,it2,range_main2_min,range_main2_max);
    let gradation_2_color=Gradation(gradation_2,it2,range_main1_min,range_main1_max);
    let gradation_22_color=Gradation(gradation_22,it2,range_main2_min,range_main2_max);
    let gradation_4_color=Gradation(gradation_4,it2,range_black_min,range_black_max);
    let gradation_14_color=Gradation(gradation_14,it2,range_black_border_min,range_black_border_max);

    for(it1=0;it1<w;it1++){
      if(image2.Get(it1, it2)==255){
        data1[(it1+it2*w)*4]  =255;
        data1[(it1+it2*w)*4+1]=255;
        data1[(it1+it2*w)*4+2]=255;
        data1[(it1+it2*w)*4+3]=255;
      }
      if(image2.Get(it1, it2)==1){
        data1[(it1+it2*w)*4]  =gradation_1_color[0];
        data1[(it1+it2*w)*4+1]=gradation_1_color[1];
        data1[(it1+it2*w)*4+2]=gradation_1_color[2];
        data1[(it1+it2*w)*4+3]=255;
      }
      if(image2.Get(it1, it2)==21){
        data1[(it1+it2*w)*4]  =gradation_21_color[0];
        data1[(it1+it2*w)*4+1]=gradation_21_color[1];
        data1[(it1+it2*w)*4+2]=gradation_21_color[2];
        data1[(it1+it2*w)*4+3]=255;
      }
      if(image2.Get(it1, it2)==2){
        data1[(it1+it2*w)*4]  =gradation_2_color[0];
        data1[(it1+it2*w)*4+1]=gradation_2_color[1];
        data1[(it1+it2*w)*4+2]=gradation_2_color[2];
        data1[(it1+it2*w)*4+3]=255;
      }
      if(image2.Get(it1, it2)==22){
        data1[(it1+it2*w)*4]  =gradation_22_color[0];
        data1[(it1+it2*w)*4+1]=gradation_22_color[1];
        data1[(it1+it2*w)*4+2]=gradation_22_color[2];
        data1[(it1+it2*w)*4+3]=255;
      }
      if(image2.Get(it1, it2)==10){
        data1[(it1+it2*w)*4]  =gradation_10_color[0];
        data1[(it1+it2*w)*4+1]=gradation_10_color[1];
        data1[(it1+it2*w)*4+2]=gradation_10_color[2];
        data1[(it1+it2*w)*4+3]=255;
      }
      if(image2.Get(it1, it2)==4){
        data1[(it1+it2*w)*4]  =gradation_4_color[0];
        data1[(it1+it2*w)*4+1]=gradation_4_color[1];
        data1[(it1+it2*w)*4+2]=gradation_4_color[2];
        data1[(it1+it2*w)*4+3]=255;
      }
      if(image2.Get(it1, it2)==14){
        data1[(it1+it2*w)*4]  =gradation_14_color[0];
        data1[(it1+it2*w)*4+1]=gradation_14_color[1];
        data1[(it1+it2*w)*4+2]=gradation_14_color[2];
        data1[(it1+it2*w)*4+3]=255;
      }
      if(image2.Get(it1, it2)==5){
        data1[(it1+it2*w)*4]  =236;
        data1[(it1+it2*w)*4+1]=156;
        data1[(it1+it2*w)*4+2]=169;
        data1[(it1+it2*w)*4+3]=255;
      }
    }
  }

  for(it1=0;it1<w;it1++){
    let gradation_3_color=Gradation(gradation_3,it1,range_green_min,range_green_max);

    for(it2=0;it2<h;it2++){
      if(image2.Get(it1, it2)==3){
        data1[(it1+it2*w)*4]  =gradation_3_color[0];
        data1[(it1+it2*w)*4+1]=gradation_3_color[1];
        data1[(it1+it2*w)*4+2]=gradation_3_color[2];
        data1[(it1+it2*w)*4+3]=255;
      }
    }
  }

  ctx1.putImageData(imagedeta1, 0, 0);
  alert('ロゴを生成完了しました。');

  let link = document.createElement("a");
  link.href = canvas1.toDataURL("image/png");
  link.download = "image.png";
  link.click();


}
function circleD(d_){
  const d   = d_ | 0;
  const rate  = 5;

  const d_r  = d*rate;
  const r_r  = (d_r-1)/2.0;
  
  let it1,it2,i,j;


  if(d<=0){
    let id = new MyImage8(1,1);
    return(id);
  }
  let id = new MyImage8(d_r,d_r);

  for(i=0; i<d_r; i++){
    for(j=0; j<d_r; j++){
      if((r_r-i)*(r_r-i)+(r_r-j)*(r_r-j) < r_r*r_r){
        id.Set(i,j,1);
      }else{
        id.Set(i,j,0);
      }
    }
  }

  let i2,j2;

  let id2 = new MyImage8(d, d);

  for(i2=0; i2<d; i2++){
    for(j2=0; j2<d; j2++){
      for(i=i2*rate; i<i2*rate+rate; i++){
        for(j=j2*rate; j<j2*rate+rate; j++){
          if(id.Get(i,j)==1){
            id2.Set(i2,j2, id2.Get(i2,j2)+1);
          }
        }
      }
      if(id2.Get(i2,j2) > rate*rate/2.0){
        id2.Set(i2,j2,255);
      }else{
        id2.Set(i2,j2,0);
      }
    }
  }
  return(id2);
}


function marge_image(id1,id2,x_,y_,xs_,ys_,xe_,ye_, color1_, color2_){
  //id1(output),id2(input),if color1 then -> color2

  const xs = xs_ | 0;
  const ys = ys_ | 0;
  const xe = xe_ | 0;
  const ye = ye_ | 0;
  const x = (x_ | 0)-xs;
  const y = (y_ | 0)-ys;
  const color1 = color1_ | 0;
  const color2 = color2_ | 0;

  const x2 = (id2.width) | 0;
  const y2 = (id2.height) | 0;

  const ww = (id1.width) | 0;
  const hh = (id1.height) | 0;

  
  let i;
  let j;
  if(xs<0){xs=0;}
  if(ys<0){ys=0;}
  if(xe>x2){xe=x2;}
  if(ye>y2){ye=y2;}

  let  i_s=x+xs;
  let  j_s=y+ys;
  let  i_e=x+xe;
  let  j_e=y+ye;

  if(i_s<0){i_s=0}
  if(j_s<0){j_s=0}
  if(i_e>ww){i_e=ww}
  if(j_e>hh){j_e=hh}

  for(i=i_s; i<i_e; i++){
    for(j=j_s; j<j_e; j++){
      if(id2.Get(i-x,j-y)==color1){
        id1.Set(i,j,color2);
      }
    }
  }
}
function Gradation(color_arry,pos_,min_,max_){
  let it;
  let r,g,b;
  let pos=pos_|0, min=min_|0, max=max_|0;
  for(it=0;it<color_arry.length-1;it++){
    let x=10000.0*(pos-min)/(max-min);
    if(color_arry[it][0]<=x && x <= color_arry[it+1][0]){
      let x2=(x-color_arry[it][0])/(color_arry[it+1][0] - color_arry[it][0]);
      r=x2*color_arry[it+1][1]+(1.0-x2)*color_arry[it][1];
      g=x2*color_arry[it+1][2]+(1.0-x2)*color_arry[it][2];
      b=x2*color_arry[it+1][3]+(1.0-x2)*color_arry[it][3];
      if(r<0){
        r=0;
      }
      if(r>255){
        r=255;
      }
      if(g<0){
        g=0;
      }
      if(g>255){
        g=255;
      }
      if(b<0){
        b=0;
      }
      if(b>255){
        b=255;
      }
    }
  }
  return [r|0,g|0,b|0];
}
function Dilation(image1, image2, r_, color1_, color2_){
  //image1(input),image2(output),
  const r = r_|0;
  const color1 = color1_|0;
  const color2 = color2_|0;

  const d = r * 2 + 1;
  const cl = circleD(d);

  let it1;
  let it2;
  let it3;
  const w=image1.width;
  const h=image1.height;
  const wm=w-1;
  const hm=h-1;
  for(it1=1; it1<wm; it1++){
    for(it2=1; it2<hm; it2++){
      if(image1.Get(it1, it2)==color1){
        image2.Set(it1, it2, color2);
        if(image1.Get(it1, it2-1)!=color1){//上棒を塗る
          for(it3=1; it3<=r; it3++){
            if(it2-it3<0){break;}
            image2.Set(it1, it2-it3, color2);
          }
          if(image1.Get(it1-1, it2)!=color1){//左上円を塗る
            marge_image(image2,cl,it1-r,it2-r,0,0,r,r, 255, color2);
          }
        }
        if(image1.Get(it1-1, it2)!=color1){//左棒を塗る
          for(it3=1; it3<=r; it3++){
            if(it1-it3<0){break;}
            image2.Set(it1-it3, it2, color2);
          }
          if(image1.Get(it1, it2+1)!=color1){//左下円を塗る
            marge_image(image2,cl,it1-r,it2+1,0,r+1,r,d, 255, color2);
          }
        }
        if(image1.Get(it1, it2+1)!=color1){//下棒を塗る
          for(it3=1; it3<=r; it3++){
            if(it2+it3>=h){break;}
            image2.Set(it1, it2+it3, color2);
          }
          if(image1.Get(it1+1, it2)!=color1){//右下円を塗る
            marge_image(image2,cl,it1+1,it2+1,r+1,r+1,d,d, 255, color2);
          }
        }
        if(image1.Get(it1+1, it2)!=color1){//右棒を塗る
          for(it3=1; it3<=r; it3++){
            if(it1+it3>=w){break;}
            image2.Set(it1+it3, it2, color2);
          }
          if(image1.Get(it1, it2-1)!=color1){//右下円を塗る
            marge_image(image2,cl,it1+1,it2-r,r+1,0,d,r, 255, color2);
          }
        }
      }
    }
  }

  
  

}