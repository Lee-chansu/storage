package ex1;

import java.util.*;

public class Ex1 {
	public static void main(String[] args) {
		String my_string = "programmers";
		String[] test = my_string.split("");
		int m = 1;
		int c = 1;
		
		String answer = "";
		for(int i = c-1; i < my_string.length(); i+=m) {
			answer += test[i];
		}
		System.out.println(answer);
	}
}
