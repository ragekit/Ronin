function Keyboard()
{
  this.is_locked = false;

  this.cmd = function()
  {
    var val = commander.element_input.value;

    if(val.indexOf(";") > 0){
      var cmds = val.split(";");
      var vals = [];
      for (i = 0; i < cmds.length; i++) {
        val = cmds[i].replace(/^\s+|\s+$/g, '');
        vals.push(val.split(" "));
      }
      return vals;
    }
    else{
      return [val.split(" ")];
    }
  }

  this.lock = function()
  {
    this.is_locked = true;
    interface.actions_panel.style.color = "red";
  }

  this.unlock = function()
  {
    this.is_locked = false;
    interface.actions_panel.style.color = "black";
  }

  this.listen = function(event)
  {
    if(this.is_locked === true){ return; }
  
    if(event.keyCode == 9) this.key_tab();
    switch (event.key) {
      case "Enter": this.key_enter(); break;
      case " " : this.key_space(); break;
      case "ArrowUp": this.key_arrow_up(); break;
      case "ArrowDown": this.key_arrow_down(); break;
      case "ArrowLeft": this.key_arrow_left(); break;
      case "ArrowRight": this.key_arrow_right(); break;
      case ":": this.key_colon(); break;
      //not sure if this one needed anymore
      case ";": if (event.shiftKey) this.key_colon(); break;
      case "Escape": this.key_escape(); break;
    }

    // Passive
    var cmd = commander.element_input.value;
    commander.passive(cmd.split(" "));
    ronin.hint.update();
  };

  this.key_tab = function()
  {
  }

  this.key_enter = function()
  {
    var cmd = commander.element_input.value;

    if(cmd.indexOf(";") > 0){
      var multi = cmd.split(";");
      var i = 0;
      while(i < 100){
        if(multi[i]){commander.active(multi[i].split(" "));}
        else{ break; }
        i += 1;
      }
    }
    else{
      commander.active(cmd.split(" "));
    }
  }

  this.key_space = function()
  {
  }

  this.key_arrow_up = function()
  {
    commander.prev_cmd();
  }

  this.key_arrow_down = function()
  {
    commander.next_cmd();
  }

  this.key_arrow_left = function()
  {
  }

  this.key_arrow_right = function()
  {
  }

  this.key_colon = function()
  {
    commander.show();
    return false;
  }

  this.key_escape = function()
  {
    commander.hide();
    ronin.overlay.clear();
  }
}
