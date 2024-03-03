def display_menu():
    print("Welcome to the Women's Self-Defense Awareness Test")
    print("Please select a scenario from the list below:")
    print("1. Walking alone at night")
    print("2. Being followed by a stranger")
    print("3. Confrontation with an aggressive individual")
    print("4. Home invasion")
    print("5. Carjacking or being attacked in a parking lot")
    print("6. Other (please describe)")

def handle_scenario(scenario):
    if scenario == 1:
        print("If you're walking alone at night, consider walking in well-lit areas, stay aware of your surroundings, and have a self-defense tool like pepper spray or a personal alarm ready.")
    elif scenario == 2:
        print("If you're being followed by a stranger, try to stay in populated areas, vary your route, and seek help from nearby people or authorities.")
    elif scenario == 3:
        print("In a confrontation with an aggressive individual, try to remain calm, assertively communicate your boundaries, and if necessary, use self-defense techniques to create distance and escape.")
    elif scenario == 4:
        print("During a home invasion, prioritize your safety and that of your loved ones. Have a plan in place, such as a safe room or an escape route, and contact emergency services immediately.")
    elif scenario == 5:
        print("If faced with a carjacking or attack in a parking lot, try to stay calm, hand over your belongings if demanded, and look for opportunities to escape or attract attention.")
    elif scenario == 6:
        other_scenario = input("Please describe the scenario: ")
        print("For the scenario '{}'".format(other_scenario))
        print("Consider similar strategies mentioned for other scenarios, and adapt based on the specific circumstances.")

def main():
    display_menu()
    scenario_choice = int(input("Enter the number corresponding to the scenario you'd like to learn about: "))
    handle_scenario(scenario_choice)

if __name__ == "__main__":
    main()