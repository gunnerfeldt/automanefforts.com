/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function getRegContent(reg){
    
    var content="";
    switch (reg)
    {
      case 1:
      content ='<h2>The Solution</h2>';
      content +='<div class="centerHeader"><img alt="CV96" src="images/AUTOMAN_white.png" /><img alt="CV96" src="images/CV96_white.png" /></div>';
      content +='<p id="fullLeft"><img class = "fleft" alt="CV96" src="images/chassiInv.png" width="291" height="176" /></p>';
      content +='<p>&nbsp;</p>';
      content +='<span>The </span><span style="font-weight:700">Automan CV96 </span><span style="font-weight:600">SSL Configuration </span><span>is a new automation system for the vintage SSL 4000, 6000 and 8000 series consoles.</span>';
      content +='<p>&nbsp;</p>';		
      content +="<ul>";		
      content +="<li>Automan CV96 is a fan less, small sized (3U 19\") connection hub between old school and modern workflow.</li>";
      content +="<li>Automan CV96 is a modular stand-alone unit. It can be configured in several ways.</li>";
      content +="<li>Automan CV96 brings a DAW workflow into analog mixing. Do your rides on real motor faders, in the sweet spot.</li>";
      content +="<li>Automan CV96 reads MTC and uses an integrated sync similar to expensive external MIDI-SMPTE boxes.</li>";
      content +="<li>Automan CV96 talks HUI.</li>";
      content +="<li>Automan CV96 is delivered complete with a stand-alone computer and fresh ribbon cables.</li>";
      content +="<li>Automan CV96 is driverless on all platforms and network ready.</li>";
      content +="<li>Automan CV96 is so modular and flexible it can host cards that control whatever you can imagine. Total Recall, EMT plates, modular synth systems, Lexicon reverbs and more.</li>";
      content +="<li>Automan CV96 is doing all kinds of cool things now, but it's just the beginning. We do not know what needs to be controlled in the future, but we know Automan CV96 can control it.</li>";
      content +="<li>Automan CV96 is installed before lunchtime.</li>";
      content +="<li>Did we mention the flexibility? <b>The Automan CV96 base unit can be used together with <i>any</i> analog desk.</b> So, there's a wide second hand market.</li>";
      content +='</ul>'; 
      break;
      
      // CV96
      case 2:
      content ='<h2>CV96</h2>';		
      content +="<ul>";		
      content +="<li>Automan CV96 rocks!!!.</li>";
      content +='</ul>'; 
      break;
      
      // EX08
      case 3:
      content ='<h2>EX08</h2>';		
      content +="<ul>";		
      content +="<li>EX08 cards are way cooler!!!.</li>";
      content +='</ul>'; 
      break;
      
      // MF08
      case 4:
      content ='<h2>MF08</h2>';		
      content +="<ul>";		
      content +="<li>MF08 faders will move. You'll be friends. Both of you will be touched!!!.</li>";
      content +='</ul>'; 
      break;
      
      // TR96
      case 5:
      content ='<h2>TR96</h2>';		
      content +="<ul>";		
      content +="<li>TR96 will guide you back to the future!!!.</li>";
      content +='</ul>'; 
      break; 
  
      // SW96
      case 6:
      content ='<h2>SW96</h2>';		
      content +="<ul>";		
      content +="<li>Our software ticks like a swiss kettle of cheese fondue!!!.</li>";
      content +='</ul>'; 
      break;
    }
    return content;
}

function getTutContent(tut){
    
    var content="";
    switch (tut)
    {
      case 1:
      content ='<h2>What is the Automan CV96 - SSL Configuration?</h2>';
      content +='<img class = "fright"  alt="EX08" src="images/EX08.png" width="77" height="129" /><p><b>Automan CV96 - SSL configuration</b>';
      content +=" is the base unit (CV96) loaded with one or more I/O-cards (EX08) and the optional set of 8 motor faders (MF08). ";
      content +="The CV96 can host up to 12 cards (supporting up to 96 channels). Automan EX08 talks to 1 bank (8 channels) of the SSL console. ";
      content +="Automan EX08 is a card designed for the SSL 4/6/8000 series. With 8 analog CV in & out plus a couple of switch and LED lines it's ";
      content +="plug and play with the original computer interface.</p>";
      content +="<p><b>Automan EX08</b> talks to 1 bank (8 channels) of the SSL console. Automan EX08 is a card designed for the SSL 4/6/8000 series. With 8 analog CV ";
      content +="in & out plus a couple of switch and LED lines it's plug and play with the original computer interface.</p>";
      content +='<p><img class = "fleft"  alt="MF08" src="images/MF08.png" width="150" height="108" /><b>Automan MF08</b> is a kit of 8 motor faders that is compatible with the SSL VCA fader ';
      content +="(same size and connectors). Automan MF08 is best placed where the VCA group faders are. Here they double as manual VCA groups faders and a control surface ";
      content +="for the rest of your console. Automan MF08 shows you all information you need. Channel number, exact fader position (<0.1dB steps) , current offset ";
      content +="to null in 0.1 dB accuracy and auto status (manual, auto, touch and read). ";
      content +="Automan EX08 will automatically find the installed MF08:s. Super easy installation.</p>";
      content +="<p><b>Automan TR96</b> is a Total Recall-card planned to be released Q2 2015. Together with the SW96TR Software it adds full Total ";
      content +="Recall support to the system.</p>";      
      break;
      
      // Installation
      case 2:
      content ='<h2>Installation</h2>';
      content +='<div class="youtubeWrapper">';
      content +='<iframe id="youtubeFrame" width="666" height="375" src="http://www.youtube.com/embed/1Z41Y4V-v3U" frameborder="0" allowfullscreen></iframe>';
      content +='</div>';	
      content +="<ul><b>Installation is done before lunch</b>";		
      content +="<li>No fans, very low current</li>";
      content +="<li>Very flexible interface options. Use in console monitor, iPad, browser.</li>";
      content +='</ul>';
      break;
      
      // Workflow 560 315
      case 3:
      content ='<h2>Basic workflow</h2>';
      content +='<div class="youtubeWrapper">';
      content +='<iframe id="youtubeFrame" width="666" height="375" src="http://www.youtube.com/embed/MnQQW-tPyWg" frameborder="0" allowfullscreen></iframe>';
      content +='</div>';	
      content +="<ul>";		
      content +="<li>All rides are done in the sweet spot</li>";
      content +="<li>Motor faders follows active bank</li>";
      content +="<li>Just press the SSL 'status' switch and off you go</li>";
      content +='</ul>'; 
      break;
      
      // Motor Faders
      case 4:
      content ='<h2>Motor Faders</h2>';
      content +='<div class="youtubeWrapper">';
      content +='<iframe id="youtubeFrame" width="666" height="375" src="http://www.youtube.com/embed/k67wtIGsMgA" frameborder="0" allowfullscreen></iframe>';
      content +='</div>';	
      content +="<ul>";		
      content +="<li>Our Motor Faders acts much like a control surface.</li>";
      content +="<li>The SSL status button sets the active bank.</li>";
      content +="<li>When you're ready to do a ride, change status and grab the fader.</li>";
      content +='</ul>'; 
      break;
      
      // Recall
      case 5:
      content ='<h2>Total Recall</h2>';
      content +='<div class="youtubeWrapper">';
      content +='<iframe id="youtubeFrame" width="666" height="375" src="http://www.youtube.com/embed/4eZjrFbX4Ik" frameborder="0" allowfullscreen></iframe>';
      content +='</div>';	
      content +="<ul>";		
      content +="<li>Remote Recall interface helps graphic intensive information</li>";
      content +="<li>New procedure can ignore bypassed features. The result is very fast recalls</li>";
      content +='</ul>';  
      break; 
  
      // Connection
      case 6:
      content ='<h2>DAW Connection</h2>';
      content +='<div class="youtubeWrapper">';
      content +='<iframe id="youtubeFrame" width="666" height="375" src="http://www.youtube.com/embed/9lVhpfGVSpU" frameborder="0" allowfullscreen></iframe>';
      content +='</div>';	
      content +="<ul><b>CV96 connects to your DAW thru...</b>";		
      content +="<li>Midi Time Code. Old school quarter frame accurate sync.</li>";
      content +="<li>USB - MIDI. 32 channel two way routing matrix.</li>";
      content +="<li>SW96 - HUI router. Our software has a built in HUI implementation to die for.</li>";
      content +='</ul>'; 
      break;
    }
    return content;
}

function getShopContent(tab){
    
    var content="";
    switch (tab)
    {
      // Your Target
      case 1:
      content ='<div class="centerHeader"><img alt="CV96" src="images/AUTOMAN_white.png" /><img alt="CV96" src="images/CV96_white.png" /></div>';
      content +='<p style="text-align: center;">Let us suggest a streamlined system for you. <br/>Please fill in some info about your console:'; 
      content +='</p><hr><div class="shopTable"><table><tr><th>SSL Series</th><td><select name="sslSeries" onchange="changeSeries(this)">'; 
      content +='<option value="E">E</option><option value="G">G</option><option value="E/G">E/G</option><option value="G+">G+</option><option disabled value="J/K">J/K</option>'; 
      content +='</select></td></tr><tr><th>Console Class</th><td> <select name="sslType" onchange="changeType(this)">'; 
      content +='<option value="4000">4000</option><option value="5000">5000</option><option value="6000">6000</option><option value="8000">8000</option><option disabled value="9000">9000</option>'; 
      content +='</select></td></tr><tr><th>Frame size</th><td> <select name="sslSize"><option value="24">24</option><option value="32">32</option><option value="40">40</option>'; 
      content +='<option value="48">48</option><option value="56">56</option><option value="64">64</option><option value="72">72</option><option value="80">80</option><option value="88">88</option>'; 
      content +='<option value="96">96</option></select></td></tr><tr><th>Mounted channels</th><td><select name="sslChannels"><option value="24">24</option><option value="32">32</option>'; 
      content +='<option value="40">40</option><option value="48">48</option><option value="56">56</option><option value="64">64</option><option value="72">72</option><option value="80">80</option>'; 
      content +='<option value="88">88</option><option value="96">96</option></select></td></tr><tr><th>Total Recall</th><td><select name="sslTr"><option value="noTr">No</option>'; 
      content +='<option value="tr">Yes</option></select></td></tr><tr><th>Automation</th><td><select name="sslAuto"><option value="vcaNoCPU">VCA w/o Computer</option>'; 
      content +='<option value="vca">VCA</option><option value="ultimation">Ultimation</option></select></td></tr></table></div>'; 
  
      
      break;

      
      // Send Request
      case 2:
      content ='Send Request';
      content +='';
      break;

    }
    return content;
}