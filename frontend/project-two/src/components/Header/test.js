
pattern=e.target.value;
if(pattern.lenght==3)
    projet_cls.getpartners_byname(pattern).then(
        (d)=>{
            if(d && d.status=='ok'){
                parterns=d.data;
            }
        }
    )