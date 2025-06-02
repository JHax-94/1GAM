using UnityEngine;
using System.Collections;

public class Flippers : MonoBehaviour 
{
	public SpriteRenderer HeadControl;
	public SpriteRenderer TailControl;

	public Sprite[] Head;
	public Sprite[] Tail;

	IEnumerator CentreDelay()
	{
		yield return new WaitForSeconds(0.1f);

		Centre ();
	}

	void setTurn(int i)
	{
		HeadControl.sprite = Head[i];
		TailControl.sprite = Tail[i];
	}

	public void Left()
	{
		StopCoroutine ("CentreDelay");
		setTurn (0);
		StartCoroutine("CentreDelay");

	}

	public void Right()
	{
		StopCoroutine("CentreDelay");
		setTurn (2);
		StartCoroutine("CentreDelay");
	}

	public void Centre()
	{
		setTurn (1);
	}



}
