var anion, cation;
  
  function MakeCompound ()
  {
    if (!(anion === undefined || cation === undefined))
    {
      initialAnionCharge  = anion[1];  //this is done to separate data so that if only
      initialCationCharge = cation[1]; //one cation or anion is changed the data in the
                                       //global arrays are not changed
      anionMultiplier  = 1;
      cationMultiplier = 1;
      
      if (initialAnionCharge === 1)
      {
        if(initialCationCharge === 1)
        {
          //multipliers are set correctly already
        }
        else
        {
          anionMultiplier = initialCationCharge;
        }
      }
      else
      {
        if(initialCationCharge === 1)
        {
          cationMultiplier = initialAnionCharge;
        }
        else
        {
          while ((initialAnionCharge * anionMultiplier) != (initialCationCharge * cationMultiplier))
          {
            if (initialAnionCharge < initialCationCharge)
              anionMultiplier += 1;
            else
              cationMultiplier += 1;
            
          }
        }
      }
      
      outputBoxString = "<p id='formatFormula'>";  
      
      if (cationMultiplier == 1)
        outputBoxString += FormatIon("cation", cationMultiplier);
      else
        outputBoxString += FormatIon("cation", cationMultiplier) + "<sub>" + cationMultiplier + "</sub>";
      
      
      if (anionMultiplier == 1)
        outputBoxString += FormatIon("anion", anionMultiplier);
      else
        outputBoxString += FormatIon("anion", anionMultiplier) + "<sub>" + anionMultiplier + "</sub>";
      
      document.getElementById("output").innerHTML = outputBoxString + "</p>";
    }
    else
    {
      document.getElementById("output").innerHTML = "Select both a cation and an anion.";
    }
  }
  
  function FormatIon(ionType, multiplier)
  {
    formatString = "";
    i = 0;
    paraFlag = paraNeeded(ionType) && multiplier > 1; //true if () are needed around the ion
    
    if (paraFlag)
      formatString = "(";
    
    if (ionType == "cation")
    {
      while (i < cation[0].length)
      {
        if (!/\d/.test(cation[0].charAt(i))) //if (not(not a number)
          formatString += cation[0].charAt(i);
        else
          formatString += "<sub>" + cation[0].charAt(i) + "</sub>";
        
        i++;
      }
    }
    else
    {
      while (i < anion[0].length)
      {
        if (!/\d/.test(anion[0].charAt(i))) //if (not(not a number))
          formatString += anion[0].charAt(i);
        else
          formatString += "<sub>" + anion[0].charAt(i) + "</sub>";
        
        i++;
      }
    }
    
    if (paraFlag)
      formatString += ")";
        
    return formatString;
  }
  
  function paraNeeded(iType)
  {
    var ion; 
    var paraFlag = false; 
    
    if (iType == 'anion')
      ion = anion;
    else if (iType == 'cation')
      ion = cation;
    
    if(ion[0].length != 1 )
    {
      if (ion[0].length == 2)
      {
        if (!isUpperCase(ion[0].charAt(2))) //second char is uppercase so there are two elements there
          paraFlag = true;
      }
      else //case: the ion's formula is greater than 2 (atoms abbreviations are two char or less)
      {
        paraFlag = true;
      }
    }
    
    return paraFlag;
  }
  
  function SetCation(cationPassed, charge)
  {
    cation = [cationPassed, charge];
  }
  
  function SetAnions(anionPassed, charge)
  {
    anion = [anionPassed, charge];
  }
  
  function isUpperCase(str)
  {
    return str === str.toUpperCase();
  }