"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useFloating, offset, flip, shift, arrow } from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/hooks/use-onboarding';

export const OnboardingTip = () => {
    const {
        steps,
        currentStep,
        nextStep,
        finishOnboarding,
        isFinished,
        isLastStep,
    } = useOnboarding();
    
    const arrowRef = useRef(null);
    
    const step = steps[currentStep];
    const [targetElement, setTargetElement] = useState<Element | null>(null);

    useEffect(() => {
      if (step?.targetElement) {
        const el = document.querySelector(step.targetElement);
        setTargetElement(el);
      }
    }, [step]);

    const { x, y, refs, strategy, middlewareData, placement } = useFloating({
        elements: {
            reference: targetElement,
        },
        placement: step?.placement || 'bottom',
        middleware: [
            offset(10),
            flip(),
            shift({ padding: 10 }),
            arrow({ element: arrowRef }),
        ],
        whileElementsMounted: (reference, floating, update) => {
            const observer = new MutationObserver(update);
            observer.observe(document.body, {
              childList: true,
              subtree: true,
            });
            return () => observer.disconnect();
        },
    });

    const handleFinish = () => {
        finishOnboarding();
    };

    const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
    }[placement?.split('-')[0] || 'bottom']!;

    return (
        <AnimatePresence>
            {!isFinished && targetElement && step && (
                <motion.div
                    ref={refs.setFloating}
                    style={{
                        position: strategy,
                        top: y ?? '',
                        left: x ?? '',
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="z-50 w-80 rounded-lg bg-card shadow-2xl focus:outline-none"
                >
                    <div className="relative">
                        <div
                            ref={arrowRef}
                            className="absolute h-2 w-2 rotate-45 bg-card"
                            style={{
                                top: middlewareData.arrow?.y,
                                left: middlewareData.arrow?.x,
                                [staticSide]: '-4px',
                            }}
                        />
                        <div className="flex items-center gap-3 p-4 rounded-t-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
                                <Lightbulb className="h-4 w-4" />
                            </div>
                            <h3 className="text-lg font-semibold">{step.title}</h3>
                        </div>
                        <div className="p-4 text-sm text-muted-foreground">{step.content}</div>

                        <div className="flex items-center justify-between p-4 border-t">
                            <span className="text-xs text-muted-foreground">
                                Step {currentStep + 1} of {steps.length}
                            </span>
                             <div className="flex items-center gap-4">
                                <Button onClick={isLastStep ? handleFinish : nextStep}>
                                    {isLastStep ? 'Finish' : 'Next'}
                                </Button>
                             </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-7 w-7"
                            onClick={handleFinish}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
