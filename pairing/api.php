<?php
// Chess Tournament Manager - storage API (PHP 7.4+). Upload next to index.html.
header('Content-Type: application/json');header('Cache-Control: no-store');
$dir=__DIR__.'/data';
if(!is_dir($dir)){mkdir($dir,0750);file_put_contents($dir.'/.htaccess',"Require all denied\nDeny from all\n");}
function out($c,$a){http_response_code($c);echo json_encode($a);exit;}
$in=json_decode(file_get_contents('php://input'),true);
if(!is_array($in))out(400,['error'=>'Bad request']);
$op=$in['op']??'';$path=$in['path']??'';$tok=(string)($in['token']??'');
if(!preg_match('~^([ast])/(CT-[A-HJ-NP-Z2-9]{6})$~',$path,$m))out(400,['error'=>'Bad path']);
$kind=$m[1];$id=$m[2];
$file=function($k)use($dir,$id){return "$dir/$k-$id.json";};
$rd=function($k)use($file){$p=$file($k);return is_file($p)?json_decode(file_get_contents($p),true):null;};
$a=$rd('a');
$auth=$a&&hash_equals((string)$a['h'],$tok);
if($op==='verify'){
  $tf="$dir/th-".md5(($_SERVER['REMOTE_ADDR']??'').$id).".json";
  $t=is_file($tf)?json_decode(file_get_contents($tf),true):['n'=>0,'t'=>time()];
  if(time()-$t['t']>600)$t=['n'=>0,'t'=>time()];
  if($t['n']>=10)out(429,['error'=>'Too many attempts. Try again in a few minutes.']);
  if(!$auth){$t['n']++;file_put_contents($tf,json_encode($t));}
  out(200,['ok'=>(bool)$auth]);
}
if($op==='get'){
  if($kind==='t'){$d=$rd('t');out(200,['exists'=>$d!==null,'data'=>$d]);}
  if($kind==='a')out(200,['exists'=>$a!==null,'data'=>$a?['salt'=>$a['salt'],'v'=>$a['v']]:null]);
  if(!$auth)out(403,['error'=>'Not authorised']);
  $d=$rd('s');out(200,['exists'=>$d!==null,'data'=>$d]);
}
if($op==='set'){
  $d=$in['data']??null;
  if(!is_array($d)||strlen(json_encode($d))>2000000)out(400,['error'=>'Bad data']);
  if($kind==='a'){
    if($a)out(409,['error'=>'ID already exists']);
    if(!isset($d['salt'],$d['h'])||!preg_match('/^[0-9a-f]{64}$/',(string)$d['h']))out(400,['error'=>'Bad auth data']);
    $d=['salt'=>(string)$d['salt'],'h'=>$d['h'],'v'=>(int)($d['v']??1)];
  } elseif(!$auth) out(403,['error'=>'Not authorised']);
  file_put_contents($file($kind),json_encode($d),LOCK_EX);
  out(200,['ok'=>true]);
}
if($op==='del'){
  if(!$auth)out(403,['error'=>'Not authorised']);
  @unlink($file($kind));out(200,['ok'=>true]);
}
out(400,['error'=>'Unknown operation']);
