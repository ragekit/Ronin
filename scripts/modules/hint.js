function Hint(element)
{
  Module.call(this);
  
  this.element = element;
  
  this.update = function()
  {
    if(ronin.module){
      this.element.innerHTML = this.message(ronin.module,commander.cmd);
      this.element.style.display = "block";
    }
    else{
      this.element.style.display = "none";
    }
  }
  
  this.message = function(module,cmd)
  {
    var s = "<span class='module'>"+module.constructor.name+"</span>";
    
    var e = 0;
    while(e < 10){
      if(!module.parameters[e]){ break; }
      var param_name = module.parameters[e].name;
      s += cmd[param_name.toLowerCase()]() ? "<span class='value'>"+cmd[param_name.toLowerCase()]().render()+"</span>" : "<span class='param'>"+param_name+"</span>";
      e += 1;
    }
    
    return s;
  }
}