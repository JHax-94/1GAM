#pragma strict

var playerBall : Transform;

public function playerBody()
{
	return playerBall.GetComponent.<Rigidbody>();
}

public function getPosition()
{
	return playerBall.position;
}

public function setVelocity(newVelocity : Vector3)
{
	playerBall.GetComponent.<Rigidbody>().velocity = newVelocity;
}