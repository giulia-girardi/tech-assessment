## Assumptions: 
- Duplicates are to be searched only among object fields and scene views. 
- More specifically, fields are compared only within the same object, and not across objects. The same applies for the views.

## Challenges: 
- Understand and navigate through the json structure
- Create the function to remove duplicates from an array of objects
- Recognize that id is always different even if objects are the same for all other properties, and decide how to deal with it. Decision: object considered duplicates even if it is automatically generated differently, so remove it when comparying and insert it back when returning the array with uniques objects. 
- Write tests: I have not learnt this in the bootcamp and decided to learn it on my own for this assigment. I can learn fast and definitely improve on this to work with Knack.

## Opportunities for improvement: 
- Solving the assessment faster 
- Cleaner and drier code (function for printing as written in the comment, but also cleanJSON could be done to accept 2 arguments - objects/scenes and fields/views - instead of having 2 map functions)
- More tests to cover all different functions and cases and look into the loosely deep-equal error

# Ideas for the extra mile 
- Deploy an application that allows upload of JSON file and returns clean file. (With more time I could have done it.)

## Thanks! 
I very much enjoyed the assessment and I am very excited about this opportunity! I hope to be able to discuss it with Knack team. 







