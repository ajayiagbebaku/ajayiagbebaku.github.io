using System;

// Namespace
namespace NumberGuesser
{
    //Main Class
    class Program
    {
        //Entry point method
        static void Main(string[] args)
        {

            //Set app vars
            string appName = "Number Guesser";
            string appVersion = "1.0.0";
            string appAuthor = "Ajayi Agbebaku Jr";

            //Change text color
            Console.ForegroundColor = ConsoleColor.Green;

            // Write out app info
            Console.WriteLine("{0}: Version {1} by {2}", appName, appVersion, appAuthor);

            //Reset text color
            Console.ResetColor();

            // Ask users name
            Console.WriteLine("What is your name?");

            //Get user input
            string inputName = Console.ReadLine();

            Console.WriteLine("Hello {0}, let's play a gamme...", inputName);

            // Init correct number
            int correctNumber = 7;

            int guess = 0;
            // Ask user for number
            Console.WriteLine("Guess a number between 1 and 10");

            while(guess != correctNumber)
            {
                //Get user input
                string input = Console.ReadLine();


                // Cast to int and put in guess
                guess = Int32.Parse(input);
                {

                    //Change text color
                    Console.ForegroundColor = ConsoleColor.Red;

                    // Write out app info
                    Console.WriteLine("{0}: Version {1} by {2}", appName, appVersion, appAuthor);

                    //Reset text color
                    Console.ResetColor();
                }

            }





       
            
        }
    }
}
