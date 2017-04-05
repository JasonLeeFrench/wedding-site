(function(){
  
  var NUMBER_OF_HEARTS = 1000;
  var GRAVITY = 4;
  var START_TIME = 10 * 1000;
  
  var win = $(window);
  var container = $('.hearts');
  var rand = Math.random;
  
  var canvas = createHiDPICanvas(win.width(), win.height());
  var context = canvas.getContext("2d");
  container.append(canvas);
  
  $('.hearts-button').click(function(){
    createHearts();
  });
  
  function createHearts(){
    var hearts = Array(NUMBER_OF_HEARTS).fill().map(function (_, i) {
      return { 
        position: [
          (win.width() / (NUMBER_OF_HEARTS) * i) - (rand() * NUMBER_OF_HEARTS) + (GRAVITY * 10), 
          0 - (rand() * NUMBER_OF_HEARTS) + (GRAVITY * 10)
        ], 
        speed: rand() + GRAVITY,
        size: rand() >= 0.5 ? 25 : 50
      }
    });
    
    function draw(hearts) {
      hearts.forEach(function(heart){
        context.font = heart.size + "px " + "Arial";
        context.fillText('❤️', heart.position[0], heart.position[1]);
      });
    }
    
    function tick(){
      hearts = hearts.map(function(heart, i){
        return {
          position: updatePostion(heart.position, heart.speed),
          speed: heart.speed,
          size: heart.size
        }
      });
      context.clearRect(0, 0, win.width(), win.height());
      draw(hearts);
      window.requestAnimationFrame(tick);
    }
    
    function updatePostion(position, speed){
      return [
        position[0] + speed,
        position[1] + speed
      ]
    }
    
    window.requestAnimationFrame(tick);
  }

}());