/* js/engine/options.js - Pairing rule options (customisable per tournament). */
const O=()=>({init:'W',bye:1,topExc:true,fh:true,relax:true,...((typeof S!=='undefined'&&S&&S.opt)||{})});
